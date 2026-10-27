/**
 * VMK's "canned text" chat encoding.
 *
 * Chat is NOT sent as a string. To keep the game safe for children, the client
 * matches every word against a downloaded dictionary and sends INDEXES into it;
 * only a few categories (your own name, a room name) travel as free text. The
 * encoder is `CCannedTextManager.TransformCannedToMsg` and the decoder is
 * `TransformCannedMsgToString` — both in cast `4dfadb85`.
 *
 * Token stream, in both directions:
 * ```
 *   0      -> + str    free text (the sender's own name)
 *   -1     -> + int    a friend's name, nominative   |
 *   -2     -> + str    a room name                   | client -> server only
 *   -3     -> + int    a friend's name, genitive     |
 *   -4     -> + int    a friend's name, plural       |
 *   -1000  -> + int    dictionary word, capitalised
 *   -1001  ->          line break
 *   n < 0  ->          |n| asterisks (censored)      server -> client only
 *   n > 0  ->          dictionary word at index n
 * ```
 *
 * ⚠ INBOUND HAS NO LEADING COUNT; OUTBOUND NEEDS ONE. `TransformCannedToMsg`
 * writes the token count only when its `a_bNoPhraseLength` argument is falsy,
 * and every chat sender passes 1 (`CMessageBar.SendMessage` for 560,
 * `CInvTrade.SendMessage` for 561). `TransformCannedMsgToString`, which reads
 * what we send back, always reads a count first.
 *
 * ⚠ AND THE TWO DIRECTIONS DISAGREE ON -1..-4. Outbound they mean "print this
 * many asterisks"; inbound they introduce a friend or room name with a
 * parameter following. Echoing those back unchanged would turn a friend's name
 * into a single "*", so `reEmit` rewrites them as free text.
 */
import { wordAt } from "./dictionary.js";
import { getUserById } from "./db.js";

/** A friend token's code is a user id; its display name is the character's. */
function friendName(code: number): string | undefined {
  const user = getUserById(code);
  if (!user) return undefined;
  return user.character_name ?? user.username;
}

/**
 * One decoded element of a message.
 *
 * `text` and `room` are both free text on the wire (tokens 0 and -2), but they
 * are kept apart because they are trusted differently: a room name comes from
 * the client's room list, while `text` is whatever the player typed that the
 * dictionary did not recognise.
 */
export type ChatToken =
  | { kind: "word"; index: number; capitalised: boolean }
  | { kind: "text"; text: string }
  | { kind: "room"; text: string }
  | { kind: "friend"; code: number; form: "nominative" | "genitive" | "plural" }
  | { kind: "break" }
  | { kind: "censored"; length: number };

/**
 * Token indices are resolved through `dictionary.ts`, which reproduces the
 * client's affix EXPANSION of the crunched word file.
 *
 * This used to read the crunched file directly, whose indices do not match the
 * client's — so any index past the first affixed entry resolved to the wrong
 * word or none. That was tolerable while token text was only ever logged, and
 * became a real defect the moment a signature had to be rendered as a string.
 */

/**
 * Encode plain text as a canned-text stream — count first, then one free-text
 * token.
 *
 * ⚠ Several messages carry text this way rather than as a plain string, because
 * they are read with `TransformCannedMsgToString`: guest room names and
 * descriptions (`2587 GuestRoomInfoMessage`) among them. A plain `str` there
 * desynchronises the frame, since the reader expects a token count first.
 *
 * A single token 0 means "append this string verbatim", so the client renders
 * exactly what we send without consulting its dictionary.
 */
export function cannedText(text: string): Array<{ int: number } | { str: string }> {
  return [{ int: 1 }, { int: 0 }, { str: text }];
}

/** Read a message body into tokens. `hasMore` reports unconsumed bytes. */
export function decodeChat(
  readInt: () => number,
  readStr: () => string,
  hasMore: () => boolean,
): ChatToken[] {
  const tokens: ChatToken[] = [];
  // Bounded so a malformed body cannot spin: no real message is this long.
  for (let i = 0; i < 512 && hasMore(); i++) {
    const token = readInt();
    if (token === 0) tokens.push({ kind: "text", text: readStr() });
    else if (token === -2) tokens.push({ kind: "room", text: readStr() });
    else if (token === -1) tokens.push({ kind: "friend", code: readInt(), form: "nominative" });
    else if (token === -3) tokens.push({ kind: "friend", code: readInt(), form: "genitive" });
    else if (token === -4) tokens.push({ kind: "friend", code: readInt(), form: "plural" });
    else if (token === -1000) tokens.push({ kind: "word", index: readInt(), capitalised: true });
    else if (token === -1001) tokens.push({ kind: "break" });
    else if (token > 0) tokens.push({ kind: "word", index: token, capitalised: false });
    else tokens.push({ kind: "censored", length: Math.min(64, -token) });
  }
  return tokens;
}

/**
 * The signature field's limit. `CAvatarBuilderPage` truncates `set.myslogan`
 * at `t_iMaxlength = 80` and shows `reg.slogan.toolong`, so no real client
 * sends more.
 */
export const SLOGAN_MAX_CHARS = 80;

/**
 * The messenger compose field's limit. `CMessengerViewMessagesCompose` stops
 * `mes.messages.messageinput` at 255 and shows `mes.msgtoolong`.
 */
export const IM_MAX_CHARS = 255;

/**
 * Trim a signature to what the client's field could have produced.
 *
 * ⚠ The slogan is re-broadcast to every online friend on every room change
 * (`announce`), so an unbounded one turns room hopping into a fan-out
 * amplifier.
 */
export function clampSlogan(tokens: ChatToken[]): ChatToken[] {
  return clampCanned(tokens, SLOGAN_MAX_CHARS);
}

/**
 * Trim canned text to `maxChars`, the size of the client field it came from.
 * Every token spends at least one character of the budget — a dictionary word
 * or friend name cannot be measured here, but each is at least that — and free
 * text is cut where the budget runs out. Anything the real field can hold
 * comes back unchanged.
 */
export function clampCanned(tokens: ChatToken[], maxChars: number): ChatToken[] {
  const out: ChatToken[] = [];
  let budget = maxChars;
  for (const token of tokens) {
    if (budget <= 0) break;
    if (token.kind === "text" || token.kind === "room") {
      const text = String(token.text ?? "").slice(0, budget);
      if (text.length === 0) continue;
      out.push({ kind: token.kind, text });
      budget -= text.length;
    } else if (token.kind === "censored") {
      const length = Math.min(token.length, budget);
      out.push({ kind: "censored", length });
      budget -= Math.max(1, length);
    } else {
      out.push(token);
      budget -= 1;
    }
  }
  return out;
}

/** Best-effort rendering for the server log. Not what the player sees. */
export function tokensToText(tokens: ChatToken[]): string {
  let out = "";
  for (const token of tokens) {
    switch (token.kind) {
      case "text":
      case "room":
        out += token.text;
        break;
      case "word": {
        const word = wordAt(token.index);
        out += word ? (token.capitalised ? word[0].toUpperCase() + word.slice(1) : word) : `<word:${token.index}>`;
        break;
      }
      case "friend":
        out += `<friend:${token.code}>`;
        break;
      case "break":
        out += "\n";
        break;
      case "censored":
        out += "*".repeat(token.length);
        break;
    }
  }
  return out;
}

/**
 * The same, but safe to SHOW A PLAYER.
 *
 * ⚠ Never put `tokensToText` output on the wire. It is a debugging rendering:
 * an index it cannot resolve becomes the literal `<word:8436>`, and a friend
 * becomes `<friend:12>`. Shipping that as an avatar's `DESC` is exactly how a
 * player's signature came out reading `<word:8436>` on their profile.
 *
 * Here an unresolvable word is dropped instead, along with the space that would
 * be left behind. The result is lossy — that is unavoidable while the server
 * cannot resolve the client's expanded dictionary — but it is always something
 * a human could plausibly have typed.
 *
 * Prefer replaying the TOKENS (`reEmit`) wherever the protocol allows canned
 * text; only fall back to this where a bare string is required.
 */
export function tokensToPlainText(tokens: ChatToken[]): string {
  let out = "";
  for (const token of tokens) {
    switch (token.kind) {
      case "text":
      case "room":
        out += token.text;
        break;
      case "word": {
        const word = wordAt(token.index);
        if (word) out += token.capitalised ? word[0].toUpperCase() + word.slice(1) : word;
        break;
      }
      case "friend":
        break;
      case "break":
        out += " ";
        break;
      case "censored":
        out += "*".repeat(token.length);
        break;
    }
  }
  // Dropping words leaves double spaces behind.
  return out.replace(/\s{2,}/g, " ").trim();
}

/**
 * For the moderation chat log: the line as the room saw it. Spacing comes from
 * the stream itself (as in `tokensToText`), friends are named, and a word the
 * server cannot resolve is marked rather than silently dropped — a moderator
 * needs to know something was there.
 */
export function tokensToLog(tokens: ChatToken[]): string {
  let out = "";
  for (const token of tokens) {
    switch (token.kind) {
      case "text":
      case "room":
        out += token.text;
        break;
      case "word": {
        const word = wordAt(token.index);
        out += word ? (token.capitalised ? word[0].toUpperCase() + word.slice(1) : word) : `[word ${token.index}]`;
        break;
      }
      case "friend":
        out += friendName(token.code) ?? `[friend ${token.code}]`;
        break;
      case "break":
        out += " ";
        break;
      case "censored":
        out += "*".repeat(token.length);
        break;
    }
  }
  return out.trim();
}

export function tokensToWords(tokens: ChatToken[]): string {
  const words: string[] = [];
  for (const token of tokens) {
    if (token.kind === "text" || token.kind === "room") {
      words.push(token.text.trim());
    } else if (token.kind === "word") {
      const word = wordAt(token.index);
      if (word) words.push(token.capitalised ? word[0].toUpperCase() + word.slice(1) : word);
    } else if (token.kind === "friend") {
      const name = friendName(token.code);
      if (name) words.push(name);
    }
  }
  return words.filter((w) => w.length > 0).join(" ");
}

/**
 * ⚠ THE CLIENT DOES NOT BLOCK UNKNOWN WORDS — IT FORWARDS THEM AS FREE TEXT.
 *
 * `ParseText` marks a word the dictionary does not recognise `#valid: 0`, but
 * still files it under `#source: #ownName`, and the encoder writes that as
 * `0` + string. The red highlight in the chat bar is only a warning; a player
 * can send anyway. Censoring is therefore the SERVER's job, and a server that
 * echoes free text back unfiltered has no safe-chat at all.
 *
 * The original replaced such a word with a run of symbols, which is what a
 * negative token means on the way out: `TransformCannedMsgToString` renders
 * `n < 0` as `|n|` asterisks.
 */
export interface ReEmitOptions {
  /** Replace unrecognised free text with asterisks. Default true. */
  censorUnknown?: boolean;
  /** The sender's character name, which is legitimately free text. */
  ownName?: string;
  /** Friend code -> name; unresolved codes stay visible rather than vanish. */
  resolveFriend?: (code: number) => string | undefined;
}

/**
 * ⚠ Must stay above -255 and clear of -1000/-1001: the client only treats a
 * token as an asterisk run when `tWordIndex < 0 and tWordIndex > -255`.
 */
const MAX_CENSOR_RUN = 254;

/**
 * Re-emit tokens for `2560 _AvatarChat`, with the leading count.
 *
 * Dictionary tokens pass through UNTOUCHED so the client resolves them against
 * its own expanded dictionary — that is what makes the rendering exact without
 * the server reimplementing the affix expander. Only the tokens whose meaning
 * differs by direction get rewritten.
 */
export function reEmit(
  tokens: ChatToken[],
  options: ReEmitOptions = {},
): Array<{ int: number } | { str: string }> {
  const { censorUnknown = true, ownName, resolveFriend } = options;
  const allowed = ownName?.trim().toLowerCase();

  const out: Array<{ int: number } | { str: string }> = [];
  let count = 0;
  const pushText = (text: string) => {
    // Your own name is the one thing the client legitimately sends as free
    // text, so it survives; anything else is a word the dictionary rejected.
    const isOwnName = allowed !== undefined && text.trim().toLowerCase() === allowed;
    if (censorUnknown && !isOwnName) {
      const run = Math.min(MAX_CENSOR_RUN, Math.max(1, text.length));
      out.push({ int: -run });
    } else {
      out.push({ int: 0 }, { str: text });
    }
  };

  for (const token of tokens) {
    switch (token.kind) {
      case "word":
        if (token.capitalised) out.push({ int: -1000 });
        out.push({ int: token.index });
        break;
      case "room":
        // A room name came from the client's own room list, not free typing.
        out.push({ int: 0 }, { str: token.text });
        break;
      case "text":
        pushText(token.text);
        break;
      case "friend": {
        // The code is `tFriend.id` from the sender's friend list
        // (`CCannedTextManager.ParseText`), which our messenger fills with
        // USER ids — so it resolves to that player's character name. Outbound
        // it has to be finished text: the client has no friend token going
        // this way, so the FORM is applied here ("Bob's", "Bobs").
        //
        // ⚠ Never put `<friend:N>` on the wire — that is `tokensToText`'s
        // debug rendering, and it was showing in chat bubbles verbatim.
        const name = resolveFriend?.(token.code) ?? friendName(token.code);
        if (name === undefined) {
          out.push({ int: -3 }); // an unknown player: "***", never a raw code
          break;
        }
        const word = token.form === "genitive" ? `${name}'s` : token.form === "plural" ? `${name}s` : name;
        out.push({ int: 0 }, { str: word });
        break;
      }
      case "break":
        out.push({ int: -1001 });
        break;
      case "censored":
        out.push({ int: -Math.min(MAX_CENSOR_RUN, Math.max(1, token.length)) });
        break;
    }
    count++;
  }
  return [{ int: count }, ...out];
}
