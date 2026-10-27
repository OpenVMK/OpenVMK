/**
 * The messenger: friends, friend requests, instant messages and messages from
 * VMK Staff.
 *
 * Client side this is cast `0b6ee192` (`cast.entry.7`): `CMessyCheeseStuff`
 * parses every message from a descriptor and `CMessengerComponent` keeps the
 * address book and inbox. Friend requests are NOT started from the messenger —
 * the room profile's "ask friendship" button sends `545 AskToBeFriend` with the
 * other player's character name.
 *
 * ⚠ A FRIEND ENTRY BRANCHES ON `online`. `parseServerMessage` reads `#condition`
 * as an int and then parses ONE of the two following descriptors:
 * ```
 *   int userID, str buddyname, canned slogan, int online,
 *     online  -> str usersRoom, int locationAccessible
 *     offline -> str lastAccessTime
 * ```
 * Send the wrong branch and every later entry in the list is misread.
 *
 * ⚠ DATES ARE DISPLAYED VERBATIM. The client's `compareDates`/`returnDate` were
 * JavaScript-syntax scripts compiled to SpiderMonkey bytecode (the `.lsasm` is
 * a bare `callJavaScript`), so their source is lost and our port of each is an
 * empty stub. The only other use of a date is `setText`. So the format is ours
 * to choose; `MM/DD/YYYY HH:MM` is readable and parses in any JS `Date`.
 */
import {
  addFriendRequest,
  addFriendship,
  addIgnore,
  addMessage,
  areFriends,
  deleteFriendRequest,
  getFriends,
  getMessengerUser,
  getMessengerUserByName,
  getPendingFriendRequests,
  getSlogan,
  getUnreadMessages,
  getUserById,
  hasFriendRequest,
  isIgnoring,
  markMessageRead,
  removeFriendship,
  setLastSeen,
  type GuestRoom,
  type MessengerUser,
  type StoredMessage,
} from "./db.js";
import { CMD, MSG, decodeToInt, readClientString, wireText, type OutgoingParam } from "./vmk-protocol.js";
import { IM_MAX_CHARS, clampCanned, clampSlogan, decodeChat, reEmit, tokensToText, type ChatToken } from "./chat-tokens.js";

/** Where an online player is, as the friend list shows it. */
export interface PeerLocation {
  /** Shown as "Name (usersRoom)" in the list and after "Visiting" in the info. */
  title: string;
  /** Enables the "go to" button. */
  accessible: boolean;
  /** The public room code whose casts load — what `GO_TO_FRIEND` enters. */
  roomCode: number;
  /** Set when that room is a player's guest room built on `roomCode`. */
  guestRoom?: GuestRoom;
}

/** One online player, as the messenger needs to reach them. */
export interface MessengerPeer {
  userId: number;
  send: (msgType: number, params: OutgoingParam[], note?: string) => void;
  /** Null between rooms (on the map). */
  location: () => PeerLocation | null;
}

interface PeerState {
  peer: MessengerPeer;
  /**
   * Set once the client has sent `MESSENGER_INIT`. Before that its address
   * book does not exist yet, so live pushes are held back — everything they
   * carry is persisted and goes out with the init reply anyway.
   */
  ready: boolean;
}

const peers = new Map<number, PeerState>();

/** Friends list limit; `ADD_FRIEND_FAILED` exists to report hitting it. */
const MAX_FRIENDS = 100;

/** What an online player with no room shows instead of a room name. */
const NO_ROOM_TITLE = "Map";

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/** `MM/DD/YYYY HH:MM`, server local time. See the note at the top. */
export function messengerDate(epochMs: number | null): string {
  if (epochMs === null) return "";
  const d = new Date(epochMs);
  return (
    `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${d.getFullYear()} ` +
    `${pad(d.getHours())}:${pad(d.getMinutes())}`
  );
}

function sloganTokens(userId: number): ChatToken[] {
  const raw = getSlogan(userId).json;
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    // Clamped on read: rows stored before the 506 handler capped them.
    return Array.isArray(parsed) ? clampSlogan(parsed as ChatToken[]) : [];
  } catch {
    return [];
  }
}

/** One friend, in the shape `2541`/`2542`/`2545` share. */
function friendEntry(friend: MessengerUser): OutgoingParam[] {
  const online = peers.get(friend.id);
  const head: OutgoingParam[] = [
    { int: friend.id },
    { str: wireText(friend.name) },
    // Replayed as tokens so the client resolves its own dictionary; the
    // server cannot render them back to words faithfully.
    ...reEmit(sloganTokens(friend.id), { censorUnknown: false }),
  ];
  if (!online) {
    return [...head, { int: 0 }, { str: messengerDate(friend.lastSeenAt) }];
  }
  const where = online.peer.location();
  return [
    ...head,
    { int: 1 },
    { str: wireText(where?.title ?? NO_ROOM_TITLE) },
    { int: where?.accessible ? 1 : 0 },
  ];
}

function friendListParams(friends: MessengerUser[]): OutgoingParam[] {
  return [{ int: friends.length }, ...friends.flatMap(friendEntry)];
}

/** Send to a player if they are online AND their messenger is up. */
function sendToReady(userId: number, msgType: number, params: OutgoingParam[], note: string): boolean {
  const state = peers.get(userId);
  if (!state?.ready) return false;
  state.peer.send(msgType, params, note);
  return true;
}

/** Tell every online friend how this player now appears (online, room, gone). */
function announce(userId: number): void {
  const me = getMessengerUser(userId);
  if (!me) return;
  const entry = [{ int: 1 }, ...friendEntry(me)];
  for (const friend of getFriends(userId)) {
    sendToReady(friend.id, MSG.FRIEND_LIST_UPDATE, entry, `FriendListUpdate ${me.name}`);
  }
}

function deliverMessage(message: StoredMessage, flash: boolean): boolean {
  if (message.kind === "staff") {
    return sendToReady(
      message.recipientId,
      MSG.MESSENGER_STAFF_MESSAGE,
      [
        { int: message.id },
        { int: flash ? 1 : 0 },
        { str: messengerDate(message.createdAt) },
        { str: wireText(message.content) },
      ],
      `StaffMessage #${message.id}`,
    );
  }
  let tokens: ChatToken[] = [];
  try {
    const parsed: unknown = JSON.parse(message.content);
    if (Array.isArray(parsed)) tokens = parsed as ChatToken[];
  } catch {
    /* an unreadable row still arrives, as an empty message the player can delete */
  }
  const sender = getMessengerUser(message.senderId);
  return sendToReady(
    message.recipientId,
    MSG.INSTANT_MESSAGE,
    [
      { int: message.id },
      { int: message.senderId },
      { str: messengerDate(message.createdAt) },
      // Staff (any moderator permission) write outside the dictionary.
      ...reEmit(tokens, { censorUnknown: !(getUserById(message.senderId)?.permissions.length), ownName: sender?.name }),
      { str: wireText(sender?.name ?? "") },
    ],
    `InstantMessage #${message.id}`,
  );
}

/* ----------------------------------------------------------- presence hooks */

/** A player logged in. Their messenger is not ready until `MESSENGER_INIT`. */
export function messengerOnline(peer: MessengerPeer): void {
  peers.set(peer.userId, { peer, ready: false });
}

/** A player disconnected: stamp "last seen" and show them offline to friends. */
export function messengerOffline(userId: number, peer: MessengerPeer): void {
  // Only the connection that registered may unregister — a replaced login
  // closing late must not knock the new one offline.
  if (peers.get(userId)?.peer !== peer) return;
  peers.delete(userId);
  setLastSeen(userId);
  announce(userId);
}

/** A player changed rooms (or left one for the map). */
export function messengerMoved(userId: number): void {
  if (peers.get(userId)?.ready) announce(userId);
}

export function messengerRenamed(userId: number): void {
  announce(userId);
}

/* --------------------------------------------------------------- staff mail */

/**
 * File a message from VMK Staff in a player's inbox, delivering it now if they
 * are online. It is persisted either way and redelivered at every login until
 * the player deletes it — which is how rewards reach someone who is offline.
 */
export function sendStaffMessage(userId: number, text: string, flash = true): StoredMessage {
  const message = addMessage(userId, 0, "staff", text);
  deliverMessage(message, flash);
  return message;
}

/* ----------------------------------------------------------------- commands */

export interface MessengerSession {
  userId: number;
  label: string;
  send: (msgType: number, params: OutgoingParam[], note?: string) => void;
  /** Move this player into the room a friend is in. */
  enter: (where: PeerLocation) => void;
}

/** The messenger command ids, so the session can route them here. */
export const MESSENGER_COMMANDS: ReadonlySet<number> = new Set([
  CMD.MESSENGER_INIT,
  CMD.FRIEND_LIST_REFRESH,
  CMD.FRIEND_LIST_FULL,
  CMD.MESSAGE_READ,
  CMD.SEND_INSTANT_MESSAGE,
  CMD.ASK_TO_BE_FRIEND,
  CMD.ACCEPT_FRIEND_REQUEST,
  CMD.DECLINE_FRIEND_REQUEST,
  CMD.REMOVE_FRIEND,
  CMD.MESSENGER_AVATAR_INFO,
  CMD.GO_TO_FRIEND,
  CMD.REPORT_MESSAGE,
  CMD.IGNORE_FRIEND_REQUESTS,
]);

function reader(body: string) {
  let offset = 0;
  return {
    int(): number {
      const { value, next } = decodeToInt(body, offset);
      offset = next;
      return value;
    },
    str(): string {
      const { value, next } = readClientString(body, offset);
      offset = next;
      return value;
    },
    more(): boolean {
      return offset < body.length;
    },
  };
}

export function handleMessengerCommand(session: MessengerSession, command: number, body: string): void {
  const { userId, label, send } = session;
  const read = reader(body);
  const self = getMessengerUser(userId);
  if (!self) return;

  switch (command) {
    case CMD.MESSENGER_INIT: {
      const state = peers.get(userId);
      if (state) state.ready = true;
      const friends = getFriends(userId);
      send(MSG.MESSENGER_READY, [], "MessengerReady");
      send(MSG.FRIEND_LIST, friendListParams(friends), `FriendList ${friends.length}`);
      for (const requester of getPendingFriendRequests(userId)) {
        send(
          MSG.FRIEND_REQUESTED,
          [{ int: requester.id }, { str: wireText(requester.name) }],
          `FriendRequested by ${requester.name}`,
        );
      }
      // Only the newest unread message flashes the messenger open; the rest
      // wait in the inbox.
      const unread = getUnreadMessages(userId);
      unread.forEach((m, i) => deliverMessage(m, i === unread.length - 1));
      console.log(
        `[${label}] messenger up: ${friends.length} friend(s), ` +
          `${getPendingFriendRequests(userId).length} request(s), ${unread.length} unread`,
      );
      announce(userId);
      return;
    }

    case CMD.FRIEND_LIST_REFRESH: {
      // Polled while a friends view is open — no logging, it would drown the log.
      const friends = getFriends(userId);
      send(MSG.FRIEND_LIST_UPDATE, friendListParams(friends), undefined);
      return;
    }

    case CMD.FRIEND_LIST_FULL: {
      const friends = getFriends(userId);
      send(MSG.FRIEND_LIST, friendListParams(friends), `FriendList ${friends.length}`);
      return;
    }

    case CMD.MESSAGE_READ: {
      const id = read.int();
      const cleared = markMessageRead(userId, id);
      console.log(`[${label}] message #${id} ${cleared ? "deleted" : "was not in this inbox"}`);
      return;
    }

    case CMD.SEND_INSTANT_MESSAGE: {
      // ⚠ `count` is the client's word, bounded only by the frame. The stock
      // compose view always sends one recipient; a forged frame repeating one
      // id hundreds of thousands of times made each a synchronous SELECT +
      // INSERT, freezing every player. Every id is still READ, so the canned
      // body after them parses, but at most MAX_FRIENDS distinct ids are KEPT.
      const count = read.int();
      const recipients = new Set<number>();
      for (let i = 0; i < count && read.more(); i++) {
        const id = read.int();
        if (recipients.size < MAX_FRIENDS && id !== userId) recipients.add(id);
      }
      // Stored once per recipient, so it is held to the compose field's size.
      const tokens = clampCanned(decodeChat(read.int, read.str, read.more), IM_MAX_CHARS);
      if (tokens.length === 0) return;
      for (const recipientId of recipients) {
        // Messages go to friends only, as the compose view only offers friends.
        if (!areFriends(userId, recipientId)) {
          console.warn(`[${label}] IM to ${recipientId} refused: not a friend`);
          continue;
        }
        const message = addMessage(recipientId, userId, "im", JSON.stringify(tokens));
        const live = deliverMessage(message, true);
        console.log(
          `[${label}] IM #${message.id} ${self.name} -> ${recipientId} ` +
            `"${tokensToText(tokens)}" (${live ? "delivered" : "stored, recipient offline"})`,
        );
      }
      return;
    }

    case CMD.ASK_TO_BE_FRIEND: {
      const name = read.str();
      const target = getMessengerUserByName(name);
      if (!target || target.id === userId) {
        console.warn(`[${label}] friend request for "${name}" refused: no such player`);
        return;
      }
      if (areFriends(userId, target.id)) return;
      // Asking someone who already asked you is a yes to them.
      if (hasFriendRequest(target.id, userId)) {
        befriend(session, self, target);
        return;
      }
      if (getFriends(userId).length >= MAX_FRIENDS) {
        send(MSG.ADD_FRIEND_FAILED, [{ int: target.id }], "AddFriendFailed (own list full)");
        return;
      }
      // An ignored requester is told nothing — the request just never lands.
      if (isIgnoring(target.id, userId)) {
        console.log(`[${label}] friend request ${self.name} -> ${target.name} dropped (ignored)`);
        return;
      }
      if (addFriendRequest(userId, target.id)) {
        sendToReady(
          target.id,
          MSG.FRIEND_REQUESTED,
          [{ int: userId }, { str: wireText(self.name) }],
          `FriendRequested by ${self.name}`,
        );
        console.log(`[${label}] friend request ${self.name} -> ${target.name}`);
      }
      return;
    }

    case CMD.ACCEPT_FRIEND_REQUEST: {
      const requester = getMessengerUser(read.int());
      if (!requester || !hasFriendRequest(requester.id, userId)) return;
      if (getFriends(userId).length >= MAX_FRIENDS || getFriends(requester.id).length >= MAX_FRIENDS) {
        deleteFriendRequest(requester.id, userId);
        send(MSG.ADD_FRIEND_FAILED, [{ int: requester.id }], "AddFriendFailed (list full)");
        return;
      }
      befriend(session, self, requester);
      return;
    }

    case CMD.DECLINE_FRIEND_REQUEST: {
      const requesterId = read.int();
      deleteFriendRequest(requesterId, userId);
      console.log(`[${label}] declined friend request from ${requesterId}`);
      return;
    }

    case CMD.IGNORE_FRIEND_REQUESTS: {
      const requesterId = read.int();
      deleteFriendRequest(requesterId, userId);
      addIgnore(userId, requesterId);
      console.log(`[${label}] ignoring friend requests from ${requesterId}`);
      return;
    }

    case CMD.REMOVE_FRIEND: {
      const friendId = read.int();
      if (!areFriends(userId, friendId)) return;
      removeFriendship(userId, friendId);
      send(MSG.FRIEND_REMOVED, [{ int: friendId }], `FriendRemoved ${friendId}`);
      sendToReady(friendId, MSG.FRIEND_REMOVED, [{ int: userId }], `FriendRemoved ${userId}`);
      console.log(`[${label}] ${self.name} removed friend ${friendId}`);
      return;
    }

    case CMD.MESSENGER_AVATAR_INFO: {
      const other = getMessengerUser(read.int());
      if (!other) return;
      send(MSG.MESSENGER_AVATAR_INFO, [{ int: other.id }, { str: wireText(other.name) }], "AvatarInfo");
      return;
    }

    case CMD.GO_TO_FRIEND: {
      const friendId = read.int();
      if (!areFriends(userId, friendId)) return;
      const where = peers.get(friendId)?.peer.location();
      if (!where?.accessible) {
        console.log(`[${label}] go to friend ${friendId} refused: not reachable`);
        return;
      }
      console.log(`[${label}] go to friend ${friendId} -> ${where.title}`);
      session.enter(where);
      return;
    }

    case CMD.REPORT_MESSAGE: {
      // No moderation queue yet; the log is the record.
      console.warn(`[${label}] ${self.name} REPORTED message #${read.int()} as offensive`);
      return;
    }
  }
}

/** Make two players friends and tell both clients. */
function befriend(session: MessengerSession, self: MessengerUser, other: MessengerUser): void {
  addFriendship(self.id, other.id);
  session.send(MSG.FRIEND_ADDED, friendEntry(other), `FriendAdded ${other.name}`);
  sendToReady(other.id, MSG.FRIEND_ADDED, friendEntry(self), `FriendAdded ${self.name}`);
  console.log(`[${session.label}] ${self.name} and ${other.name} are now friends`);
}
