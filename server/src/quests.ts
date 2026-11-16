/**
 * THE QUEST ENGINE — official (staff) quests, played through the client's own
 * quest UI (`vmk_quest_engine`, CQuestEngine*). Protocol and field order:
 * docs/QUEST-ENGINE.md.
 *
 * The client decides nothing: the Q button sends `852` and whatever we answer
 * picks the window. So the whole flow lives here:
 *
 *   852 on a quest        -> 2853 CurrentTaskData (+ 2869 items in this room)
 *   852 not on a quest    -> 2852 QuestInstanceData, officialQuestCount > 0 ->
 *                            the JOIN page (next/prev = 855, PLAY = 851)
 *   851 start             -> 2853 (+2869); the client sends nothing else
 *   task done (an event)  -> 2854 completed; its button sends 845 ->
 *                            2853 next task, or 2855 QuestCompleted after the last
 *   wrong answer/timeout  -> 2854 failed; 845 -> the same task again
 *   857 (QUEST INFO)      -> 2852 with officialQuestCount = 0 -> the INFO page
 *   853 quit              -> nothing to send (the window closes itself)
 *
 * Tasks are completed by what the server already sees — rooms entered, tiles
 * walked onto, chat, emotes, magic, NPC clicks, minigame results, credits —
 * which mus-server.ts reports through the `QuestSession` event methods.
 *
 * ⚠ Findable items (types 2/19) are NEVER clicked. The client draws them on
 * tiles from 2869 and does nothing else; the server notices the avatar on the
 * tile and sends 2870. The client also drops the sprites on every room_leave,
 * so 2869 is resent on every room entry.
 */
import { db, creditListeners, itemListeners } from "./db.js";
import { MSG, CMD, decodeToInt, type OutgoingParam } from "./vmk-protocol.js";

import { OFFICIAL_QUESTS, TASK, GAME, type OfficialQuest, type QuestTask } from "./quest-defs.js";
export { OFFICIAL_QUESTS, TASK, GAME, FINDABLE } from "./quest-defs.js";

const questById = (id: number) => OFFICIAL_QUESTS.find((q) => q.id === id);

// ---------------------------------------------------------------- persistence

db.exec(`
  CREATE TABLE IF NOT EXISTS quest_progress (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    quest_id    INTEGER NOT NULL,
    status      TEXT    NOT NULL,             -- active | done | quit
    task        INTEGER NOT NULL DEFAULT 0,
    found       TEXT    NOT NULL DEFAULT '[]', -- tiles found in the current task ("room:tile")
    started_at  INTEGER NOT NULL,
    finished_at INTEGER,
    rating      INTEGER
  );
  CREATE INDEX IF NOT EXISTS idx_quest_progress_user ON quest_progress(user_id, status);
  CREATE INDEX IF NOT EXISTS idx_quest_progress_quest ON quest_progress(quest_id, status);
`);

interface ProgressRow {
  id: number;
  user_id: number;
  quest_id: number;
  status: string;
  task: number;
  found: string;
  started_at: number;
  finished_at: number | null;
  rating: number | null;
}

function activeRow(userId: number): ProgressRow | undefined {
  return db
    .prepare("SELECT * FROM quest_progress WHERE user_id = ? AND status = 'active' ORDER BY id DESC LIMIT 1")
    .get(userId) as ProgressRow | undefined;
}

function hasCompleted(userId: number, questId: number): boolean {
  return (
    db.prepare("SELECT 1 FROM quest_progress WHERE user_id = ? AND quest_id = ? AND status = 'done' LIMIT 1").get(userId, questId) !==
    undefined
  );
}

function questStats(questId: number): { joins: number; completes: number; rating: number } {
  const row = db
    .prepare(
      `SELECT COUNT(*) AS joins,
              SUM(CASE WHEN status = 'done' THEN 1 ELSE 0 END) AS completes,
              AVG(rating) AS rating
         FROM quest_progress WHERE quest_id = ?`,
    )
    .get(questId) as { joins: number; completes: number | null; rating: number | null };
  return { joins: Number(row.joins), completes: Number(row.completes ?? 0), rating: Math.round(Number(row.rating ?? 0)) };
}

/** The fastest finishers, for the join page's hall of fame. */
function fastest(questId: number, limit = 10): { name: string; secs: number }[] {
  const rows = db
    .prepare(
      `SELECT u.character_name AS name, MIN(p.finished_at - p.started_at) AS ms
         FROM quest_progress p JOIN users u ON u.id = p.user_id
        WHERE p.quest_id = ? AND p.status = 'done' AND u.character_name IS NOT NULL
        GROUP BY p.user_id ORDER BY ms ASC LIMIT ?`,
    )
    .all(questId, limit) as { name: string; ms: number }[];
  return rows.map((r) => ({ name: r.name, secs: Math.max(0, Math.round(Number(r.ms) / 1000)) }));
}

// ---------------------------------------------------------------- the session

type Send = (msg: number, params: OutgoingParam[], note?: string) => void;

/** What a quest needs from the connection playing it (mus-server.ts). */
export interface QuestHost {
  userId: number;
  label: string;
  send: Send;
  /** The public room code we are in; undefined in a guest room or between rooms. */
  roomCode: () => number | undefined;
  ownsPin: (code: number) => boolean;
  ownsItem: (code: number) => boolean;
  /** Pay the prize: credits + pins, announced the way other rewards are. */
  grant: (quest: OfficialQuest) => void;
  /** Open the item info panel for a prize's type code (`2522 ITEM_DETAILS`). */
  showItemDetails: (typeCode: number) => void;
}

/** Live sessions by user, for the db listeners (credits, items). */
const sessions = new Map<number, QuestSession>();

creditListeners.add((userId, delta, reason, staffId) => sessions.get(userId)?.creditsChanged(delta, reason, staffId));
itemListeners.add((userId, codes) => sessions.get(userId)?.itemsAdded(codes));

/** What the client is waiting on after a 2854. */
type Awaiting = "none" | "next" | "retry" | "finish";

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const secsSince = (t: number) => Math.max(0, Math.floor((Date.now() - t) / 1000));
/** Reasons whose credits a quest's earn task does not count — its own prize, staff edits. */
const NOT_EARNED = new Set(["Quest Reward"]);

export class QuestSession {
  private row: ProgressRow | undefined;
  private awaiting: Awaiting = "none";
  /** The finished quest's 2855, held until its last 2854 is dismissed. */
  private finishParams: OutgoingParam[] | null = null;
  private taskTimer: NodeJS.Timeout | undefined;
  private taskStartedAt = Date.now();
  /** Credits spent / earned since the current task began. */
  private spent = 0;
  private earned = 0;
  /** Which official quest the join page shows. */
  private browseIndex = 0;

  constructor(private readonly host: QuestHost) {
    this.row = activeRow(host.userId);
    if (this.row && !questById(this.row.quest_id)) {
      // A quest that was removed from quest-defs: drop it rather than strand the player.
      this.setStatus("quit");
      this.row = undefined;
    }
    sessions.set(host.userId, this);
  }

  dispose(): void {
    clearTimeout(this.taskTimer);
    if (sessions.get(this.host.userId) === this) sessions.delete(this.host.userId);
  }

  private log(text: string): void {
    console.log(`[${this.host.label}] quest: ${text}`);
  }

  private get quest(): OfficialQuest | undefined {
    return this.row ? questById(this.row.quest_id) : undefined;
  }

  private get task(): QuestTask | undefined {
    const q = this.quest;
    return q && this.row ? q.tasks[this.row.task] : undefined;
  }

  /** Accept the event only while the task it would complete is the one on screen. */
  private current(type: number): QuestTask | undefined {
    if (this.awaiting !== "none") return undefined;
    const t = this.task;
    return t && t.type === type ? t : undefined;
  }

  private found(): Set<string> {
    try {
      return new Set(JSON.parse(this.row?.found ?? "[]") as string[]);
    } catch {
      return new Set();
    }
  }

  private save(): void {
    if (!this.row) return;
    db.prepare("UPDATE quest_progress SET task = ?, found = ? WHERE id = ?").run(this.row.task, this.row.found, this.row.id);
  }

  private setStatus(status: "done" | "quit"): void {
    if (!this.row) return;
    db.prepare("UPDATE quest_progress SET status = ?, finished_at = ? WHERE id = ?").run(status, Date.now(), this.row.id);
  }

  // ------------------------------------------------------------ commands

  /** Handle a quest command. True if it was one. */
  handle(command: number, body: string): boolean {
    const ints = (): number[] => {
      const out: number[] = [];
      let at = 0;
      while (at < body.length && out.length < 8) {
        const { value, next } = decodeToInt(body, at);
        if (next <= at) break;
        out.push(value);
        at = next;
      }
      return out;
    };
    switch (command) {
      case CMD.QUEST_CURRENT_TASK:
        this.openQuestButton();
        return true;
      case CMD.QUEST_GET_OFFICIAL: {
        const [currentId, next] = ints();
        const at = OFFICIAL_QUESTS.findIndex((q) => q.id === currentId);
        const n = OFFICIAL_QUESTS.length;
        this.browseIndex = at < 0 ? 0 : (at + (next === 1 ? 1 : -1) + n) % n;
        this.sendInstance(OFFICIAL_QUESTS[this.browseIndex], true);
        return true;
      }
      case CMD.QUEST_GET_INSTANCE: {
        const [id] = ints();
        const q = questById(id ?? -1) ?? this.quest;
        if (q) this.sendInstance(q, false);
        return true;
      }
      case CMD.QUEST_START: {
        const [id] = ints();
        this.start(id ?? -1);
        return true;
      }
      case CMD.QUEST_PROCEED:
        this.proceed();
        return true;
      case CMD.QUEST_QUIT:
        this.quit();
        return true;
      case CMD.QUEST_ANSWER: {
        const [option] = ints();
        this.answer(option ?? 0);
        return true;
      }
      case CMD.QUEST_PRIZE_DETAILS: {
        // Double-click on a prize thumbnail: `[templateId, rank, prizeIndex]`.
        // Every official quest has one prize (rank 0); the index picks its item.
        const [id, , index] = ints();
        const q = questById(id ?? -1);
        const code = q?.reward.pins[index ?? 0];
        if (code !== undefined) this.host.showItemDetails(code);
        return true;
      }
      case CMD.QUEST_RATE: {
        const [, avatarQuestId, rating] = ints();
        if (avatarQuestId && rating && rating >= 1 && rating <= 5) {
          db.prepare("UPDATE quest_progress SET rating = ? WHERE id = ? AND user_id = ?").run(rating, avatarQuestId, this.host.userId);
          this.log(`rated ${rating}/5`);
        }
        return true;
      }
      default:
        return false;
    }
  }

  /** 852: the Q button. */
  private openQuestButton(): void {
    if (this.awaiting === "finish" && this.finishParams) {
      this.sendFinish();
      return;
    }
    if (this.quest) {
      this.awaiting = "none";
      this.sendTask();
      return;
    }
    if (OFFICIAL_QUESTS.length === 0) return;
    // The first quest this player can still do, else the first not yet done.
    const playable = OFFICIAL_QUESTS.findIndex((q) => !hasCompleted(this.host.userId, q.id) && this.prerequisitesMet(q));
    const open = OFFICIAL_QUESTS.findIndex((q) => !hasCompleted(this.host.userId, q.id));
    this.browseIndex = playable >= 0 ? playable : open >= 0 ? open : 0;
    this.sendInstance(OFFICIAL_QUESTS[this.browseIndex], true);
  }

  private prerequisitesMet(q: OfficialQuest): boolean {
    return (q.requiresPins ?? []).every((code) => this.host.ownsPin(code));
  }

  /** 851. */
  private start(questId: number): void {
    const q = questById(questId);
    if (!q) return;
    if (hasCompleted(this.host.userId, q.id)) return this.log(`refused ${q.id}: already completed`);
    if (!this.prerequisitesMet(q)) return this.log(`refused ${q.id}: missing a required pin`);
    if (this.row) {
      if (this.row.quest_id === q.id) {
        this.sendTask();
        return;
      }
      this.setStatus("quit"); // one quest at a time: starting another drops this one
    }
    const res = db
      .prepare("INSERT INTO quest_progress (user_id, quest_id, status, task, found, started_at) VALUES (?, ?, 'active', 0, '[]', ?)")
      .run(this.host.userId, q.id, Date.now());
    this.row = activeRow(this.host.userId);
    this.log(`started "${q.name}" (#${q.id}, progress ${Number(res.lastInsertRowid)})`);
    this.awaiting = "none";
    this.beginTask();
  }

  /** 845: the TaskCompleted / TaskFailed window's button. */
  private proceed(): void {
    switch (this.awaiting) {
      case "finish":
        this.sendFinish();
        return;
      case "next":
      case "retry":
        this.awaiting = "none";
        this.beginTask();
        return;
      default:
        if (this.quest) this.sendTask();
    }
  }

  /** 853. */
  private quit(): void {
    if (!this.row) return;
    this.log(`quit "${this.quest?.name}" at task ${this.row.task + 1}`);
    this.setStatus("quit");
    this.row = undefined;
    this.awaiting = "none";
    clearTimeout(this.taskTimer);
    this.host.send(MSG.QUEST_HIDE_FINDABLE, [{ int: -1 }], "QuestHideFindable all");
  }

  /** 865. */
  private answer(option: number): void {
    const t = this.current(TASK.CHOICE);
    if (!t) return;
    if (option === t.correct) this.complete();
    else this.fail(false);
  }

  // ------------------------------------------------------------ task flow

  /** Make the current task live: its clock, its counters, its window. */
  private beginTask(): void {
    clearTimeout(this.taskTimer);
    this.taskStartedAt = Date.now();
    this.spent = 0;
    this.earned = 0;
    const t = this.task;
    if (!t || !this.row) return;
    if (t.timeLimitS) this.taskTimer = setTimeout(() => this.fail(true), t.timeLimitS * 1000);
    this.sendTask();
    // Already standing where the task points, or already holding the item:
    // solved on the spot (`quest.task.completed.immediately` is for items).
    if (t.type === TASK.ROOM && t.room === this.host.roomCode()) setTimeout(() => this.current(TASK.ROOM) === t && this.complete(), 1500);
    if (t.type === TASK.ACQUIRE && t.item !== undefined && this.host.ownsItem(t.item)) {
      setTimeout(() => this.current(TASK.ACQUIRE) === t && this.complete(true), 1500);
    }
  }

  private complete(immediately = false): void {
    const q = this.quest;
    const t = this.task;
    if (!q || !t || !this.row) return;
    clearTimeout(this.taskTimer);
    const number = this.row.task;
    this.host.send(MSG.QUEST_TASK_NOTIFICATION, this.notification(q, t, number, false, false, immediately), `QuestTaskNotification done ${number + 1}/${q.tasks.length}`);
    this.log(`task ${number + 1}/${q.tasks.length} done (type ${t.type})`);
    this.row.task = number + 1;
    this.row.found = "[]";
    if (this.row.task < q.tasks.length) {
      this.save();
      this.awaiting = "next";
      return;
    }
    // The last task: settle now, so a disconnect before the dialog loses nothing.
    const secs = secsSince(this.row.started_at);
    this.setStatus("done");
    this.finishParams = [
      { int: q.id },
      { int: this.row.id },
      { str: q.name },
      { int: secs },
      { int: 0 }, // prizingMode: in order of completion
      { int: 1 }, // rank -> "1st prize"
      { int: q.reward.credits },
      { int: q.reward.pins.length },
      ...q.reward.pins.map((code) => ({ int: code })),
      { int: -1 }, // remainingQuestDurationInSecs: no limit
    ];
    this.host.grant(q);
    this.log(`completed "${q.name}" in ${secs}s: +${q.reward.credits} credits, pins ${q.reward.pins.join(",") || "none"}`);
    this.row = undefined;
    this.awaiting = "finish";
  }

  private fail(timedOut: boolean): void {
    const q = this.quest;
    const t = this.task;
    if (!q || !t || !this.row) return;
    clearTimeout(this.taskTimer);
    this.host.send(MSG.QUEST_TASK_NOTIFICATION, this.notification(q, t, this.row.task, true, timedOut, false), `QuestTaskNotification failed ${this.row.task + 1}`);
    this.log(`task ${this.row.task + 1} failed${timedOut ? " (time)" : ""}`);
    this.awaiting = "retry";
  }

  private sendFinish(): void {
    if (this.finishParams) this.host.send(MSG.QUEST_COMPLETED, this.finishParams, "QuestCompleted");
    this.finishParams = null;
    this.awaiting = "none";
  }

  // ------------------------------------------------------------ events

  /** After the room is built (2869 needs its tiles). */
  roomReady(): void {
    const t = this.task;
    if (!t || !this.row) return;
    if (t.type === TASK.FIND || t.type === TASK.FIND_MANY) this.sendFindables();
    const here = this.host.roomCode();
    if (here !== undefined && this.current(TASK.ROOM)?.room === here) this.complete();
  }

  tileEntered(tile: number): void {
    const t = this.task;
    if (!t || !this.row || this.awaiting !== "none" || (t.type !== TASK.FIND && t.type !== TASK.FIND_MANY)) return;
    const room = this.host.roomCode();
    const spot = t.spots?.find((s) => s.room === room && s.tile === tile);
    if (!spot) return;
    const found = this.found();
    const key = `${spot.room}:${spot.tile}`;
    if (found.has(key)) return;
    found.add(key);
    this.row.found = JSON.stringify([...found]);
    this.save();
    this.host.send(MSG.QUEST_HIDE_FINDABLE, [{ int: tile }], `QuestHideFindable ${tile}`);
    const need = t.required ?? t.spots?.length ?? 1;
    this.log(`found item ${spot.code} on tile ${tile} (${found.size}/${need})`);
    if (found.size >= need) this.complete();
  }

  said(text: string): void {
    const t = this.current(TASK.SAY);
    if (t?.phrase && norm(text).includes(norm(t.phrase))) this.complete();
  }

  emoticon(id: number): void {
    const t = this.current(TASK.EMOTE);
    if (t && (t.emoticon === undefined || t.emoticon === id)) this.complete();
  }

  danced(): void {
    if (this.current(TASK.DANCE)) this.complete();
  }

  waved(): void {
    if (this.current(TASK.WAVE)) this.complete();
  }

  sat(): void {
    if (this.current(TASK.SIT)) this.complete();
  }

  clothesChanged(): void {
    if (this.current(TASK.CLOTHES)) this.complete();
  }

  magicCast(pinTypeCode: number): void {
    const t = this.current(TASK.MAGIC);
    if (t && (t.pin === undefined || t.pin === pinTypeCode)) this.complete();
  }

  npcVisited(code: number): void {
    if (this.current(TASK.NPC)?.npc === code) this.complete();
  }

  minigame(game: number, score: number, won: boolean): void {
    const t = this.current(TASK.MINIGAME);
    if (!t) return;
    const pirates: number[] = [GAME.PIRATES_CTF, GAME.PIRATES_SHIP_BATTLE];
    const sameGame = t.game === game || (t.game === GAME.PIRATES && pirates.includes(game));
    if (!sameGame) return;
    if (score < (t.score ?? 0) || (t.win && !won)) {
      this.log(`minigame ${game}: ${score}${won ? " (won)" : ""} not enough for ${t.score ?? 0}${t.win ? " + a win" : ""}`);
      return;
    }
    this.complete();
  }

  creditsChanged(delta: number, reason: string, staffId: number | null): void {
    if (staffId !== null || delta === 0) return;
    if (delta < 0) {
      this.spent -= delta;
      const t = this.current(TASK.SPEND);
      if (t && this.spent >= (t.amount ?? 0)) setTimeout(() => this.current(TASK.SPEND) === t && this.complete(), 0);
    } else if (!NOT_EARNED.has(reason)) {
      this.earned += delta;
      const t = this.current(TASK.EARN);
      if (t && this.earned >= (t.amount ?? 0)) setTimeout(() => this.current(TASK.EARN) === t && this.complete(), 0);
    }
  }

  itemsAdded(codes: number[]): void {
    const t = this.current(TASK.ACQUIRE);
    if (t?.item !== undefined && codes.includes(t.item)) setTimeout(() => this.current(TASK.ACQUIRE) === t && this.complete(), 0);
  }

  // ------------------------------------------------------------ wire

  /** `#tasksettings` as the server sends them (docs/QUEST-ENGINE.md). */
  private settings(t: QuestTask): OutgoingParam[] {
    switch (t.type) {
      case TASK.NPC:
        return [{ int: t.npc ?? 0 }];
      case TASK.FIND:
      case TASK.FIND_MANY:
        // ⚠ Count only — the client reads NO item pairs here; they go in 2869.
        return [{ int: t.required ?? t.spots?.length ?? 1 }, { int: t.spots?.length ?? 0 }];
      case TASK.ROOM:
        return [{ int: t.room ?? 0 }];
      case TASK.MINIGAME:
        return [{ int: t.game ?? 0 }, { int: t.score ?? 0 }];
      case TASK.MAGIC:
        return [{ int: t.pin ?? 0 }];
      case TASK.SAY:
        return [{ str: t.phrase ?? "" }];
      case TASK.SPEND:
      case TASK.EARN:
        return [{ int: t.amount ?? 0 }];
      case TASK.EMOTE:
        return [{ int: t.emoticon ?? 0 }];
      case TASK.ACQUIRE:
        return [{ int: t.item ?? 0 }];
      case TASK.CHOICE: {
        const answers = t.answers ?? [];
        return [{ int: t.correct ?? 1 }, { int: answers.length }, ...answers.map((a) => ({ str: a }))];
      }
      case TASK.COLLECT:
        return [{ int: t.item ?? 0 }, { int: t.amount ?? 0 }];
      default:
        return [];
    }
  }

  /** 2853 for the current task. */
  private sendTask(): void {
    const q = this.quest;
    const t = this.task;
    if (!q || !t || !this.row) return;
    const options = t.type === TASK.CHOICE ? (t.answers ?? []) : [];
    const remaining = t.timeLimitS ? Math.max(0, t.timeLimitS - secsSince(this.taskStartedAt)) : -1;
    this.host.send(
      MSG.QUEST_CURRENT_TASK_DATA,
      [
        { int: q.id },
        { str: q.name },
        { int: this.row.task },
        { int: q.tasks.length },
        { int: remaining },
        { int: secsSince(this.row.started_at) },
        { str: t.hint },
        { int: 0 }, // photoId: none
        { int: options.length },
        ...options.map((o) => ({ str: o })),
        // foundMickeyColor_count, then (mickeyColor, mickeyCount) pairs — the
        // later quest build's addition. Above 0 it opens the Hidden Mickey hint
        // window instead of the task hint, so official quests send none.
        { int: 0 },
      ],
      `QuestCurrentTask ${this.row.task + 1}/${q.tasks.length} type ${t.type}`,
    );
    if (t.type === TASK.FIND || t.type === TASK.FIND_MANY) this.sendFindables();
  }

  /** 2869: the current task's unfound items in THIS room (an empty list clears the old room's). */
  private sendFindables(): void {
    const t = this.task;
    const room = this.host.roomCode();
    const found = this.found();
    const here = (t?.spots ?? []).filter((s) => s.room === room && !found.has(`${s.room}:${s.tile}`));
    this.host.send(
      MSG.QUEST_SHOW_FINDABLE,
      [{ int: here.length }, ...here.flatMap((s) => [{ int: s.tile }, { int: s.code }])],
      `QuestShowFindable ${here.length}`,
    );
  }

  private notification(q: OfficialQuest, t: QuestTask, number: number, failed: boolean, timedOut: boolean, immediately: boolean): OutgoingParam[] {
    return [
      { int: q.id },
      { str: q.name },
      { int: number },
      { int: q.tasks.length },
      { int: this.row ? secsSince(this.row.started_at) : 0 },
      { int: failed ? 1 : 0 },
      { int: t.type },
      { int: timedOut ? 1 : 0 },
      { int: immediately ? 1 : 0 },
      ...this.settings(t),
    ];
  }

  /**
   * 2852. `join` (from the Q button / next-prev) sends the official count, which
   * makes the client open the JOIN page; the hint window's QUEST INFO sends 0,
   * which opens the INFO page.
   */
  private sendInstance(q: OfficialQuest, join: boolean): void {
    const stats = questStats(q.id);
    const players = fastest(q.id);
    const index = OFFICIAL_QUESTS.indexOf(q);
    const done = hasCompleted(this.host.userId, q.id);
    // "expired" greys out PLAY THIS QUEST: done already, or the chain's pin missing.
    const blocked = done || !this.prerequisitesMet(q);
    const onIt = this.row?.quest_id === q.id;
    this.host.send(
      MSG.QUEST_INSTANCE_DATA,
      [
        { int: q.id },
        { int: 1 }, // official
        { int: 0 }, // owner: not this player
        { str: "VMK" },
        { str: q.name },
        { str: q.description },
        { int: 0 }, // prizingMode: order
        { int: 1 }, // visibility
        { int: q.tasks.length },
        { int: -1 }, // remainingQuestDurationInSecs: no limit
        { int: stats.rating },
        { int: 0 }, // authorRating
        { int: stats.joins },
        { int: stats.completes },
        { int: 0 }, // taken_prize_count
        { int: 1 }, // remaining_prize_count: every finisher gets the prize
        { int: q.reward.credits },
        { int: 0 }, // categoryTime
        { int: q.reward.pins.length },
        ...q.reward.pins.map((code) => ({ int: code })),
        { int: players.length },
        ...players.flatMap((p) => [{ str: p.name }, { int: p.secs }]),
        { int: join ? OFFICIAL_QUESTS.length : 0 },
        { int: Math.max(0, index) },
        { int: 0 }, // spaceSpecific
        { int: blocked ? 1 : 0 },
        { int: onIt ? 1 : 0 },
      ],
      `QuestInstance "${q.name}" ${join ? "join" : "info"}${done ? " (done)" : blocked ? " (locked)" : ""}`,
    );
  }
}
