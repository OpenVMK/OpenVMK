/**
 * Director's sound channels, backed by real audio.
 *
 * WHAT DIRECTOR PROMISES, AND WHAT VMK ACTUALLY USES
 *
 * `sound(1)` … `sound(8)` are persistent channel objects with a play LIST, not
 * one-shot play calls. VMK drives them from `CSoundChannelObject.PlaySound`:
 *
 *     queue(channel, [#member: sndMem, …])
 *     play(channel)
 *
 * and reads back `volume`, `pan`, `status` and `loopCount`. That is the whole
 * surface — 52 `sound(n)` lookups and 9 channel-method calls across the port —
 * so this models the play list faithfully and leaves the exotic parts of the
 * Director API (`#startTime`/`#endTime` cue points, `playNext` mid-clip
 * seeking) as the honest approximations noted at each one.
 *
 * ⚠ AUDIO IS BLOCKED UNTIL THE FIRST USER GESTURE. Browsers refuse `play()` on
 * a page the user has not interacted with, and VMK starts a looping sound on
 * the loading screen (`CLoadingWindow.EnableLoadingSound`) long before any
 * click. A refusal there is the BROWSER's policy, not a wiring fault, so it is
 * swallowed and the clip is remembered as pending — `resumeBlockedAudio` on the
 * first gesture starts whatever should already be playing. Without that, the
 * background music never starts for the whole session even though every later
 * call succeeds.
 */
import { VOID, LingoList, LingoPropList, type LingoValue } from "./lingo-runtime.js";

/** How Director counts time: ticks are 1/60 s. */
const TICKS_PER_SECOND = 60;
/**
 * `the duration of member` for a SOUND is MILLISECONDS, not ticks.
 *
 * ⚠ VMK's only reader says so: `CSoundChannelObject.TimeLeft` subtracts 10 per
 * `delay(10, #TimeLeft)`, and `delay` is milliseconds. In ticks a clip looked
 * finished after 6% of its length, so `CSoundChannelAllocator` handed its
 * still-playing channel to the next sound — which `play()` then QUEUED behind
 * the old clip. The Monorail Station's `MR-doors-open` waited ~3 s behind
 * `MR-train-arrive` that way, long after the doors had opened.
 */
const durationOf = (seconds: number): number => Math.round(seconds * 1000);
/** Director volumes are 0–255; HTMLAudioElement wants 0–1. */
const MAX_VOLUME = 255;

/**
 * A member as this module needs to see it.
 *
 * Structural rather than importing `CastMember`, so the sound layer does not
 * depend on the cast layer — `lingo-cast` already imports from here's siblings
 * and a cycle would be the result.
 */
interface SoundMember {
  name: string;
  soundPath: string;
  duration: number;
  loop: number;
}

const isSoundMember = (value: unknown): value is SoundMember =>
  typeof value === "object" && value !== null && typeof (value as SoundMember).soundPath === "string";

/**
 * Decoded audio, keyed by URL.
 *
 * ⚠ Shared across channels and reused across plays. VMK re-queues the same UI
 * clip constantly (every button press), and a fresh `Audio` per play would
 * re-fetch it each time and leak an element per press.
 */
const media = new Map<string, HTMLAudioElement>();

/** Clips whose `play()` the browser refused; retried on the first gesture. */
const blocked = new Set<() => void>();
let gestureHooked = false;

/**
 * Start listening for the first user gesture, once.
 *
 * Registered lazily rather than at module load so the Node smoke test (no
 * `window`) can import this file.
 */
function hookGesture(): void {
  if (gestureHooked || typeof window === "undefined") return;
  gestureHooked = true;
  const release = () => {
    for (const retry of [...blocked]) retry();
    blocked.clear();
  };
  for (const event of ["pointerdown", "keydown"]) {
    window.addEventListener(event, release, { once: false, passive: true });
  }
}

function elementFor(url: string): HTMLAudioElement | null {
  if (typeof Audio === "undefined") return null;
  const existing = media.get(url);
  if (existing) return existing;
  const audio = new Audio(url);
  audio.preload = "auto";
  media.set(url, audio);
  return audio;
}

/**
 * Start buffering a clip BEFORE anything plays it.
 *
 * ⚠ `elementFor` only creates (and so only starts fetching) a clip the first
 * time it is PLAYED, so a first play always starts late by the download. For a
 * UI click heard again and again that is invisible; for a room's one-shots it is
 * every play: the Monorail Station starts its doors-open animation and
 * `MR-doors-open` in the same call (`TrainStops`), and the sound arrived after
 * the doors had visibly opened. Called for a room's sound and handler casts as
 * they attach, so the clips are buffered by the time the room's handler needs
 * them. Idempotent — the element is the cache.
 *
 * ⚠ It also has to fill in `duration` BEFORE the first play. `PlaySound` reads
 * `the duration of member` before it queues the clip, so a duration learned only
 * at play time made every first play count as zero-length — the channel looked
 * free at once and the next sound was queued behind a clip still playing.
 */
export function prewarmSound(member: SoundMember): void {
  if (!member.soundPath) return;
  const audio = elementFor(member.soundPath);
  if (!audio) return;
  audio.load();
  captureDuration(audio, member);
  // Every clip now PLAYS from the decoded buffer (see `advance`), so decode it
  // ahead too — otherwise each first play waits on the fetch and decode.
  void loopFor(member.soundPath);
}

// ---------------------------------------------------------------------------
// Gapless looping
// ---------------------------------------------------------------------------

/**
 * ⚠ A LOOPING CLIP CANNOT GO THROUGH `HTMLAudioElement.loop`, AND THE REASON IS
 * THE FILE FORMAT, NOT THE FLAG.
 *
 * Director stores raw PCM; the extractor writes MP3. MP3 is frame-based, so an
 * encoder pads the start and the decoder cannot tell that padding from content —
 * MEASURED on `vmk-map-5`, the navigator's map music: 76.7 ms of silence before
 * the first sample and 57.1 ms after the last, in a file whose middle runs at a
 * steady RMS of 0.08. `audio.loop` replays the whole file, so every pass injects
 * 134 ms of dead air that the original never had. Reported as "it hard cuts back
 * in; that's not how the game normally loops".
 *
 * Web Audio loops a decoded BUFFER between two sample-accurate offsets, so
 * looping over the audible span skips the padding entirely and the join is
 * seamless. That is only worth its decode cost for clips that actually repeat,
 * so one-shots keep the element path.
 */
interface DecodedLoop {
  buffer: AudioBuffer;
  /** Seconds into the buffer where audible content starts and ends. */
  start: number;
  end: number;
}

let audioContext: AudioContext | null = null;
const decoded = new Map<string, DecodedLoop | Promise<DecodedLoop | null> | null>();

function contextFor(): AudioContext | null {
  if (audioContext) return audioContext;
  const Ctor =
    typeof AudioContext !== "undefined"
      ? AudioContext
      : (globalThis as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  audioContext = new Ctor();
  /**
   * Same autoplay rule as the element path: a context created before any gesture
   * starts SUSPENDED, and every source started into it is silent until it is
   * resumed. The gesture hook already exists for exactly this.
   */
  if (audioContext.state === "suspended") {
    hookGesture();
    blocked.add(() => void audioContext?.resume().catch(() => undefined));
  }
  return audioContext;
}

/**
 * The audible span of a decoded clip.
 *
 * ⚠ Trimmed by CONTENT, not by a fixed padding size. Encoder delay varies with
 * the encoder and the file, and Director's own sound members are not uniformly
 * padded either, so measuring each clip is the only rule that holds for all of
 * them. The threshold is well under the quietest music in the set (RMS 0.036 at
 * the tail of the map music) so a genuine fade is not clipped.
 */
function audibleSpan(buffer: AudioBuffer): { start: number; end: number } {
  const threshold = 0.005;
  const rate = buffer.sampleRate;
  let first = buffer.length;
  let last = 0;
  for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
    const samples = buffer.getChannelData(channel);
    for (let i = 0; i < samples.length; i++) {
      if (Math.abs(samples[i]!) > threshold) { if (i < first) first = i; break; }
    }
    for (let i = samples.length - 1; i >= 0; i--) {
      if (Math.abs(samples[i]!) > threshold) { if (i > last) last = i; break; }
    }
  }
  // Silence throughout: loop the whole thing rather than a zero-length region.
  if (first >= buffer.length || last <= first) return { start: 0, end: buffer.duration };
  return { start: first / rate, end: (last + 1) / rate };
}

async function decodeLoop(url: string): Promise<DecodedLoop | null> {
  const context = contextFor();
  if (!context || typeof fetch !== "function") return null;
  try {
    const bytes = await (await fetch(url)).arrayBuffer();
    const buffer = await context.decodeAudioData(bytes);
    const span = audibleSpan(buffer);
    const result: DecodedLoop = { buffer, start: span.start, end: span.end };
    decoded.set(url, result);
    return result;
  } catch {
    // Undecodable (or an unsupported codec) — the element path still plays it,
    // padding and all, which is better than silence.
    decoded.set(url, null);
    return null;
  }
}

function loopFor(url: string): DecodedLoop | Promise<DecodedLoop | null> | null {
  const existing = decoded.get(url);
  if (existing !== undefined) return existing;
  const pending = decodeLoop(url);
  decoded.set(url, pending);
  return pending;
}

// ---------------------------------------------------------------------------
// Exact clips — Director's own length, for sequenced (gapless) play lists
// ---------------------------------------------------------------------------

/**
 * ⚠ A DIRECTOR SOUND KNOWS ITS EXACT LENGTH; THE MP3 WE EXTRACTED DOES NOT.
 *
 * The music mixers queue 16 clips per track and rely on the channel playing them
 * back to back, sample-accurately — one clip = one slot (2000 ms Street Party,
 * 1777 ms Monorail). The extracted MP3s are LAME output with no gapless tag, so
 * each decodes ~105-130 ms LONGER than its slot: a 1105-sample encoder delay in
 * front and frame padding behind. MEASURED, Street `drm_1_2`: 2115.9 ms decoded
 * = 50.1 ms delay + 2000 ms content + 65.8 ms padding. Played whole, every track
 * slipped a tenth of a second per slot and the four drifted over each other —
 * "overlapping audio".
 *
 * The cast chunk (`raw_chunks/<file>_snd_.bin`) keeps Director's header, and its
 * int32 at byte 36 is the SAMPLE COUNT: 44100 for that clip (= 2000 ms at the
 * MP3's 22050 Hz) and 39200 for the Monorail's (= 1777.8 ms — exactly the
 * Monorail metronome's 1777). Skip the delay, play exactly that many samples.
 */
interface ExactClip {
  buffer: AudioBuffer;
  /** Seconds into the decoded buffer where the content starts / ends. */
  start: number;
  end: number;
}

/** LAME's encoder + decoder delay, in source samples (576 + 529). */
const MP3_CODEC_DELAY = 1105;

const exact = new Map<string, ExactClip | Promise<ExactClip | null> | null>();

/** Sample rate from the first MPEG audio frame header, or 0. */
function mpegSampleRate(bytes: Uint8Array): number {
  for (let i = 0; i + 3 < bytes.length && i < 4096; i++) {
    if (bytes[i] !== 0xff || (bytes[i + 1]! & 0xe0) !== 0xe0) continue;
    const version = (bytes[i + 1]! >> 3) & 3; // 3 = MPEG-1, 2 = MPEG-2, 0 = MPEG-2.5
    const index = (bytes[i + 2]! >> 2) & 3;
    const base = [44100, 48000, 32000][index];
    if (base === undefined) return 0;
    return version === 3 ? base : version === 2 ? base / 2 : version === 0 ? base / 4 : 0;
  }
  return 0;
}

async function decodeExact(url: string): Promise<ExactClip | null> {
  const context = contextFor();
  if (!context || typeof fetch !== "function" || !/\/sounds\/[^/]+\.mp3$/i.test(url)) return null;
  const headerUrl = url.replace(/\/sounds\/([^/]+)\.mp3$/i, "/raw_chunks/$1_snd_.bin");
  try {
    const [audioResponse, headerResponse] = await Promise.all([fetch(url), fetch(headerUrl)]);
    // A dev server answers an unknown path with its SPA page — not a header.
    if (!headerResponse.ok || (headerResponse.headers.get("content-type") ?? "").includes("html")) return null;
    const header = new Uint8Array(await headerResponse.arrayBuffer());
    const bytes = await audioResponse.arrayBuffer();
    if (header.length < 40) return null;
    const count = ((header[36]! << 24) | (header[37]! << 16) | (header[38]! << 8) | header[39]!) >>> 0;
    const rate = mpegSampleRate(new Uint8Array(bytes, 0, Math.min(bytes.byteLength, 4096)));
    const buffer = await context.decodeAudioData(bytes);
    if (!rate) return null;
    const start = MP3_CODEC_DELAY / rate;
    /**
     * ⚠ NOT EVERY HEADER HAS THE COUNT AT BYTE 36.
     *
     * The Monorail's `emptySnd` (vmk_monorail_mixer_samples) has a shorter
     * header — its MP3 frame starts at byte 40 — and byte 36 reads 1393, so
     * every metronome slot played 63 ms instead of 1777 and the song raced to
     * its end in a second. A real count lands within a frame or two of the
     * decoded content (the rest is padding); one that doesn't is not a count.
     * Use the decoded content then — the queue entry's `#endTime` still crops it.
     */
    const content = buffer.duration - start;
    const counted = count / rate;
    const plausible = count > 0 && counted <= content + 0.01 && counted >= content - 0.15;
    const end = start + (plausible ? counted : content);
    if (end - start < 0.02) return null;
    return { buffer, start, end };
  } catch {
    return null;
  }
}

function exactFor(url: string): ExactClip | Promise<ExactClip | null> | null {
  const existing = exact.get(url);
  if (existing !== undefined) return existing;
  const pending = decodeExact(url).then((clip) => {
    exact.set(url, clip);
    return clip;
  });
  exact.set(url, pending);
  return pending;
}

/**
 * One start time for every channel told to play in the same tick.
 *
 * The mixer starts its four tracks and the metronome in one loop
 * (`playBackControl("Play")`); starting each "now" as it is reached puts them a
 * few ms apart, and they stay apart for the whole song. A shared time a little
 * ahead locks them together.
 */
/**
 * Channels that start in the same tick but must wait for a decode wait for EACH
 * OTHER, so they still start together (the first play of a new mix).
 */
let pendingBatch: { waits: Promise<unknown>[]; ready: Promise<void> } | null = null;
function joinStartBatch(wait: Promise<unknown>): Promise<void> {
  if (!pendingBatch) {
    const batch: { waits: Promise<unknown>[]; ready: Promise<void> } = { waits: [], ready: Promise.resolve() };
    batch.ready = new Promise<void>((resolve) => {
      setTimeout(() => {
        pendingBatch = null;
        void Promise.all(batch.waits).then(() => resolve(), () => resolve());
      }, 0);
    });
    pendingBatch = batch;
  }
  pendingBatch.waits.push(wait);
  return pendingBatch.ready;
}

let batchStart: number | null = null;
function sharedStart(context: AudioContext): number {
  if (batchStart === null || batchStart < context.currentTime) {
    batchStart = context.currentTime + 0.08;
    setTimeout(() => { batchStart = null; }, 0);
  }
  return batchStart;
}

/**
 * Fill in `the duration of member` from the decoded media.
 *
 * ⚠ VMK reads `duration` to decide when a clip is finished
 * (`CSoundChannelObject.TimeLeft`), and the manifest does not carry it — only
 * the audio itself knows. Reporting 0 forever makes a channel look permanently
 * finished, so this is written back onto the member as soon as metadata lands.
 */
function captureDuration(audio: HTMLAudioElement, member: SoundMember): void {
  const apply = () => {
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      member.duration = durationOf(audio.duration);
    }
  };
  if (audio.readyState >= 1) apply();
  else audio.addEventListener("loadedmetadata", apply, { once: true });
}

/** One entry in a channel's play list. */
interface QueuedSound {
  member: SoundMember;
  loopCount: number;
  /**
   * `#rateShift` — Director's pitch shift for a queued sound, in SEMITONES.
   *
   * ⚠ NOT A VMK INVENTION, and not optional decoration: it is a native Director
   * play-list property, passed exactly like `#member` and `#loopCount`:
   *
   *     call(#queue, [a_rChannel], [#member: a_rSound, #rateShift: a_fPitch])
   *     CSoundObject.PitchSound:  m_mpSndProps[#rateShift] = a_iAmount
   *
   * and the room sound documents set it declaratively:
   *
   *     <SOUND member="ES-street-ambience-pitch" loopCount="1000" rateShift="-12">
   *
   * MEASURED across the extracted casts: 235 occurrences in 144 `Sound.xml`
   * members, so most rooms use it. Dropping it left every such cue playing at
   * its file rate — reported as "off pitch", and the asset names say the same
   * thing out loud (`tiki-octave-pitch`, `ES-street-ambience-pitch`). `-12` is
   * an octave down, which is the most common non-trivial value (54 of 235).
   *
   * Zero means "no shift"; it is the identity for the conversion below.
   */
  rateShift: number;
  /** `#startTime` / `#endTime`, ms into the clip — honoured on the exact path. */
  startMs?: number;
  endMs?: number;
}

/**
 * Semitones -> playback rate multiplier. An octave (12 semitones) doubles or
 * halves the rate, so this is the standard equal-temperament conversion.
 * Guarded because a malformed document can hand us a non-number, and a NaN
 * `playbackRate` throws where a silently unshifted sound merely sounds wrong.
 */
function rateFromShift(semitones: number): number {
  if (!Number.isFinite(semitones) || semitones === 0) return 1;
  const rate = Math.pow(2, semitones / 12);
  return Number.isFinite(rate) && rate > 0 ? rate : 1;
}

/**
 * Read the `#member` out of what VMK queued.
 *
 * `queue` takes a prop list (`[#member: …, #loopCount: …]`) but Director also
 * accepts a bare member, and `CSoundChannelAllocator.PlaySound` passes one
 * through in at least one path.
 */
function toQueued(value: LingoValue): QueuedSound | null {
  if (isSoundMember(value)) return { member: value, loopCount: 0, rateShift: 0 };
  if (value instanceof LingoPropList) {
    const member = value.getProp("#member");
    if (!isSoundMember(member)) return null;
    const loops = value.getProp("#loopCount");
    // The documents write it both as an integer and as a float ("-12" and
    // "-12.0"), and `value()` may hand either through, so coerce rather than
    // test the type.
    const shift = Number(value.getProp("#rateShift"));
    const startMs = Number(value.getProp("#startTime"));
    const endMs = Number(value.getProp("#endTime"));
    return {
      member,
      loopCount: Number(loops) || 0,
      rateShift: Number.isFinite(shift) ? shift : 0,
      // The mixer's metronome: `[#member: emptySnd, #startTime: 0, #endTime: 1777, …]`.
      startMs: Number.isFinite(startMs) && startMs > 0 ? startMs : undefined,
      endMs: Number.isFinite(endMs) && endMs > 0 ? endMs : undefined,
    };
  }
  return null;
}

/**
 * Director's `the status of sound(n)`.
 *
 * VMK reads this in two places and otherwise tracks its own
 * `m_iChannelStatus`, so only the idle/playing distinction has to be right.
 */
const STATUS_IDLE = 0;
const STATUS_PLAYING = 3;
const STATUS_PAUSED = 4;

/** A running Web Audio loop — see the note above `DecodedLoop`. */
interface LoopPlayback {
  source: AudioBufferSourceNode;
  gain: GainNode;
  /**
   * ⚠ Present so "is this channel AUDIBLE" is measurable, not inferred. A
   * scheduled source on a suspended context reports exactly the same state as a
   * playing one — status, loop flags and all — and browsers suspend by default
   * until a gesture. Reading the signal is the only way to tell them apart.
   */
  analyser: AnalyserNode | null;
  /** The looped region, in seconds into the buffer. */
  start: number;
  end: number;
  startedAt: number;
  offset: number;
  /** Length of one pass, seconds. Zero for an endless member loop. */
  region: number;
  /** Passes this node was scheduled to make. Zero means endless. */
  repeats: number;
  /** Set on clips booked ahead by `bookExact` — still on the play list until they start. */
  entry?: QueuedSound;
}

/**
 * What a channel currently has playing. Exactly one of `audio` and `loop` is
 * set: the element path for one-shots, Web Audio for anything that repeats.
 */
interface Playing {
  entry: QueuedSound;
  audio: HTMLAudioElement | null;
  loop: LoopPlayback | null;
}

/** Peak amplitude in the loop's current frame, 0–1. Zero means inaudible. */
function signalOf(loop: LoopPlayback): number | null {
  if (!loop.analyser) return null;
  const frame = new Float32Array(loop.analyser.fftSize);
  loop.analyser.getFloatTimeDomainData(frame);
  let peak = 0;
  for (const sample of frame) peak = Math.max(peak, Math.abs(sample));
  return Math.round(peak * 1000) / 1000;
}

class SoundChannel {
  readonly channel: number;
  private volumeValue = MAX_VOLUME;
  private panValue = 0;
  status = STATUS_IDLE;

  /**
   * `the volume of sound(n)` — 0 to 255, CLAMPED.
   *
   * ⚠ The clamp is not defensive, it is load-bearing, because VMK reads the
   * volume back to compute the next step of a ramp. `CSoundTracker.SoundEvent`
   * steps a fade with
   *
   *     t_iVol = (t_iMax - t_iMin) / 50
   *     t_iVol = sound(t_iChn).volume + t_iVol
   *
   * over exactly 50 ticks, and a fade-out (`PREF="[255,0,10000]"`) steps by
   * -5 from a volume that may already be below 255 — so it drives the value
   * well past zero and relies on Director stopping at 0. MEASURED on Main
   * Street after the music and train fade-outs: channel 5 read -150 and
   * channel 8 read -125. Playback was silent either way, but the NEXT fade-in
   * would then have had to climb 150 before becoming audible — 30 of its 50
   * steps spent inaudible.
   */
  get volume(): number {
    return this.volumeValue;
  }

  set volume(value: number) {
    const level = Number(value);
    this.volumeValue = Number.isFinite(level) ? Math.min(MAX_VOLUME, Math.max(0, level)) : 0;
  }

  /**
   * `sound(n).isBusy()` — TRUE while the channel is playing.
   *
   * ⚠ Unimplemented, it threw "method not found: isBusy" from the Jungle
   * Cruise guide's `PlayIfNotBusy`, which runs inside the game component's
   * per-frame `update` (the tutorial's `SaySomething`), so every frame
   * aborted before the boat moved: the game sat frozen on the dock.
   */
  isBusy(): number {
    return this.status === STATUS_PLAYING ? 1 : 0;
  }

  /** `the pan of sound(n)` — full left to full right, clamped like Director. */
  get pan(): number {
    return this.panValue;
  }

  set pan(value: number) {
    const position = Number(value);
    this.panValue = Number.isFinite(position) ? Math.min(100, Math.max(-100, position)) : 0;
  }
  /**
   * `the loopCount of sound(n)` — the repeats LEFT on what this channel is
   * playing, which is a property of the clip, not of the channel.
   *
   * ⚠ This was a plain field that nothing ever wrote, so it answered 0 forever
   * while `describe()` reported the true count from the same object. That is how
   * room ambience died after exactly one 60-second pass:
   * `CSoundTracker.ResetTracker` builds its protected-channel list with
   *
   *     repeat with i = 1 to 8
   *       if sound(i).loopCount > 0 then m_arLoopChannels.add(i)
   *
   * and `TrackerEvent` skips any channel in that list. With every channel
   * answering 0 the list stayed empty, so the next pass's cue hit the busy
   * branch, called `stop()` on the still-looping ambience, and could not restart
   * it — `ResetTracker` also clears `m_mp_SndTypes`, so `CheckTypeStatus`
   * answers 0 for everything from the second pass on. Silence, permanently,
   * about a minute after entering any room.
   */
  private idleLoopCount = 0;

  get loopCount(): number {
    if (!this.current) return this.idleLoopCount;
    const loop = this.current.loop;
    if (loop && loop.repeats > 0) {
      const context = contextFor();
      const elapsed = context ? Math.max(0, context.currentTime - loop.startedAt) : 0;
      return Math.max(0, loop.repeats - Math.floor(elapsed / loop.region));
    }
    return this.current.entry.loopCount;
  }

  /**
   * ⚠ Assigning `loopCount` arms the NEXT sound, it does not retune the current
   * one. `Sound_Channel_Class.play` is the only writer and it sets the property
   * BEFORE starting the clip:
   *
   *     if tSoundObj.getProperty(#infiniteloop) then tLoopCount = the maxinteger
   *     tChannel.loopCount = tLoopCount
   *     tChannel.play(tmember)
   *
   * so an endless sound reaches here as a very large count rather than as a
   * member flag. `advance` seeds an entry that carries no count of its own.
   */
  set loopCount(value: number) {
    this.idleLoopCount = Number(value) || 0;
  }
  private queue_: QueuedSound[] = [];
  private current: Playing | null = null;
  /**
   * Bumped by every `advance`, `stop` and `rewind`. A decode is asynchronous, so
   * by the time it lands the channel may already be playing something else —
   * without this the late arrival would start a second, unwanted clip over it.
   */
  private generation = 0;
  /** Multiplier applied on top of `volume`, driven by fadeIn/fadeOut. */
  private fade = 1;
  private fadeTimer: ReturnType<typeof setInterval> | null = null;
  /**
   * The gapless chain — see `ExactClip`. Every exact clip still scheduled (the
   * next one is booked on the audio clock before the current one ends), when
   * the last booked one ends, and the timer that books the next.
   */
  private scheduled = new Set<LoopPlayback>();
  private chainEnd = 0;
  private chainTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(channel: number) {
    this.channel = channel;
  }

  /** What this channel is actually doing, for `soundStats`. */
  describe(): Record<string, unknown> | null {
    if (!this.current) return null;
    const { audio, loop, entry } = this.current;
    return {
      channel: this.channel,
      member: entry.member.name,
      via: loop ? "webaudio" : "element",
      loop: loop ? loop.source.loop : (audio?.loop ?? false),
      loopRegion: loop ? [loop.start, loop.end] : null,
      loopCount: entry.loopCount,
      paused: loop ? false : (audio?.paused ?? true),
      at: audio ? Math.round(audio.currentTime * 1000) / 1000 : null,
      of: audio && Number.isFinite(audio.duration) ? Math.round(audio.duration * 1000) / 1000 : 0,
      signal: loop ? signalOf(loop) : null,
      context: audioContext?.state ?? null,
      queued: this.queue_.length,
      status: this.status,
    };
  }

  private get level(): number {
    return Math.min(1, Math.max(0, (this.volume / MAX_VOLUME) * this.fade));
  }

  /** Push `volume` x `fade` onto whatever is playing. Public: the Lingo-facing
   * wrapper's `volume` setter has to trigger it. */
  syncVolume(): void {
    if (!this.current) return;
    if (this.current.audio) this.current.audio.volume = this.level;
    if (this.current.loop) this.current.loop.gain.gain.value = this.level;
    // Booked-ahead clips too — a mixer track muted mid-song must stay muted.
    for (const booked of this.scheduled) booked.gain.gain.value = this.level;
  }

  queue(value: LingoValue): void {
    const entry = toQueued(value);
    if (!entry) return;
    /**
     * ⚠ RE-QUEUEING THE ENDLESS LOOP THAT IS PLAYING = A NEW PITCH FOR IT.
     *
     * `CSoundObject.PitchSound` re-sends the playing loop with a new
     * `#rateShift` (`queue` + `play`), several times a second — the Jungle
     * Cruise motor follows the boat's speed that way. In Director `play(props)`
     * replays it at the new pitch; ours saw the channel busy, kept the old
     * pitch and piled the entry onto a queue an endless loop never reaches (93
     * deep after 20 s). Retune the running node instead — the same pitch, with
     * no restart for Web Audio to stumble over.
     */
    const live = this.current;
    if (live?.loop && live.loop.repeats === 0 && live.entry.member === entry.member && entry.member.loop) {
      live.entry.rateShift = entry.rateShift;
      live.loop.source.playbackRate.value = rateFromShift(entry.rateShift);
      return;
    }
    this.queue_.push(entry);
    // Start decoding now: a play list is queued and played in one go.
    if (!entry.member.loop && entry.loopCount <= 1) exactFor(entry.member.soundPath);
  }

  setPlayList(list: LingoValue): void {
    this.queue_ = [];
    if (list instanceof LingoList) {
      for (const item of list.toArray()) this.queue(item);
    }
  }

  getPlayList(): LingoValue {
    /**
     * ⚠ CLIPS BOOKED AHEAD ARE STILL ON THE PLAY LIST.
     *
     * `startExact` books every decoded clip onto the audio clock at once and
     * shifts it off `queue_`, so the list read empty within a frame of `play`.
     * Director lists a sound until it STARTS, and the music mixers depend on
     * that: `CMusicMixerInterface.update` counts the metronome channel's list
     * down to move the play head, and stops the song when it reaches 0 — so
     * Play started and stopped in the same frame. A booked clip leaves the
     * list when the audio clock reaches its start.
     */
    const now = audioContext?.currentTime ?? 0;
    const booked = [...this.scheduled]
      .filter((playback) => playback.entry !== undefined && playback.startedAt > now)
      .sort((a, b) => a.startedAt - b.startedAt)
      .map((playback) => playback.entry!);
    return new LingoList(
      [...booked, ...this.queue_].map((entry) => new LingoPropList(["#member", entry.member as unknown as LingoValue])),
    ) as unknown as LingoValue;
  }

  play(value?: LingoValue): void {
    // `play(channel, soundData)` both queues and starts; `play(channel)` starts
    // what is already queued. PlaySound uses BOTH spellings — see its loop and
    // non-loop branches — so accepting an argument here is required, not
    // defensive.
    if (value !== undefined && value !== VOID) this.queue(value);
    if (this.current) return;
    this.advance();
  }

  private advance(): void {
    // The chain books the next clip BEFORE the current one ends; with nothing
    // left to book, the last booked clip's own end makes the channel idle.
    if (this.queue_.length === 0 && this.scheduled.size > 0) return;
    const entry = this.queue_.shift();
    this.generation++;
    if (!entry) {
      this.status = STATUS_IDLE;
      this.current = null;
      return;
    }

    /**
     * ⚠ A SEQUENCE PLAYS GAPLESSLY, ON EXACT LENGTHS — see `ExactClip`. Taken only
     * for a play list (something still queued behind this clip, or a chain in
     * progress): the mixer's tracks and metronome, the stage player. A lone
     * one-shot (a UI click) keeps the element path below.
     */
    const context = audioContext;
    const chaining = context !== null && this.chainEnd > context.currentTime;
    if (!entry.member.loop && entry.loopCount <= 1 && (this.queue_.length > 0 || chaining)) {
      const clip = exactFor(entry.member.soundPath);
      // Mid-chain and ready: book it now, right behind the previous clip.
      if (clip && !(clip instanceof Promise) && chaining) {
        this.startExact(entry, clip);
        return;
      }
      // Starting a sequence: go through the start batch even if this clip is
      // ready, so every channel told to play now starts on the same clock tick.
      if (clip && !(clip instanceof Promise)) {
        const generation = this.generation;
        this.status = STATUS_PLAYING;
        const behind = this.queue_.map((queued) => exactFor(queued.member.soundPath));
        void joinStartBatch(Promise.all(behind)).then(() => {
          if (this.generation !== generation) return;
          this.startExact(entry, clip);
        });
        return;
      }
      if (clip instanceof Promise) {
        const generation = this.generation;
        this.status = STATUS_PLAYING;
        // Also wait for everything behind it, and for the other channels
        // starting now — see `joinStartBatch`.
        const behind = this.queue_.map((queued) => exactFor(queued.member.soundPath));
        const wait = Promise.all([clip, ...behind]);
        void (chaining ? wait : joinStartBatch(wait)).then(() => clip).then((ready) => {
          if (this.generation !== generation) return;
          if (ready) this.startExact(entry, ready);
          else this.startElement(entry);
        });
        return;
      }
    }
    // A count set on the CHANNEL applies to a clip queued without one of its own
    // — see the `loopCount` setter.
    if (entry.loopCount <= 0 && this.idleLoopCount > 0) entry.loopCount = this.idleLoopCount;

    /**
     * A member that loops goes through Web Audio so the join is seamless — see
     * the note above `DecodedLoop`. The decode is cached, so only the first play
     * of each clip waits; the channel reports PLAYING immediately either way,
     * because VMK polls `the status of sound` and treats idle as "finished".
     *
     * ⚠ `#loopCount` IS A LOOP TOO, and it was taking the element path.
     *
     * Director repeats a queued sound WITHIN one playback; the repeat is a loop
     * over the member's loop region, not a re-play of the member. Ours re-queued
     * the clip on the element's `ended` event, so every pass paid a `play()`
     * round trip and the format's own padding — an audible cut and restart at
     * each join. That is what a room's ambience bed sounds like when it is wrong:
     * `main_street_sound.xml` gives `MS-ambience-mono-loop` loopCount="1000" over
     * a 5.4-second clip, so the seam landed every five seconds, forever.
     *
     * The XML's own comment names these as loops ("Set loop count 12", "Set
     * start and end points for loop"), and the members are named `*-mono-loop`.
     */
    if (entry.member.loop || entry.loopCount > 1) {
      const ready = loopFor(entry.member.soundPath);
      if (ready && !(ready instanceof Promise)) {
        this.startLoop(entry, ready);
        return;
      }
      if (ready instanceof Promise) {
        const generation = this.generation;
        this.status = STATUS_PLAYING;
        void ready.then((result) => {
          if (this.generation !== generation) return;
          if (result) this.startLoop(entry, result);
          else this.startElement(entry);
        });
        return;
      }
    }

    /**
     * ⚠ ONE-SHOTS GO THROUGH WEB AUDIO TOO — the element is only a fallback.
     *
     * The element path ends a clip on the element's `ended` event, and Chrome
     * does not always deliver one. MEASURED in Chrome (Demo, Main Street): the
     * shared `popup-tab-change` element sat "playing" at 0.001 s of 0.265 s and
     * `open-map` at 0.366 s of 0.63 s, neither advancing, with 4 and 2 sounds
     * queued behind them — `play()` on a channel with a `current` only queues,
     * so every interface click routed to those channels was silent from then on
     * while room ambience (Web Audio) carried on. A buffer source's `onended`
     * fires off the audio clock; nothing can strand it.
     */
    const decodedClip = loopFor(entry.member.soundPath);
    if (decodedClip && !(decodedClip instanceof Promise)) {
      this.startOneShot(entry, decodedClip);
      return;
    }
    if (decodedClip instanceof Promise) {
      const generation = this.generation;
      this.status = STATUS_PLAYING;
      void decodedClip.then((result) => {
        if (this.generation !== generation) return;
        if (result) this.startOneShot(entry, result);
        else this.startElement(entry);
      });
      return;
    }

    this.startElement(entry);
  }

  /**
   * A single play of a decoded clip, start to finish — see the note in
   * `advance`. The whole buffer plays (not the trimmed span `startLoop` joins
   * on): a one-shot has no seam to hide, and trimming could clip a soft attack.
   *
   * `repeats: 0` so `loopCount` reports the entry's own count, exactly as the
   * element path did — `CSoundTracker` protects any channel answering > 0.
   */
  private startOneShot(entry: QueuedSound, clip: DecodedLoop): void {
    const context = contextFor();
    if (!context) { this.startElement(entry); return; }
    entry.member.duration = durationOf(clip.buffer.duration);
    if (context.state === "suspended") {
      // No gesture yet: a source started now would sit on a frozen clock and
      // hold the channel until one. A moment that has passed is SKIPPED, not
      // replayed late — the same rule as a refused element one-shot.
      hookGesture();
      blocked.add(() => void context.resume().catch(() => undefined));
      this.current = null;
      this.advance();
      return;
    }

    const rate = rateFromShift(entry.rateShift);
    const source = context.createBufferSource();
    source.buffer = clip.buffer;
    source.playbackRate.value = rate;
    const gain = context.createGain();
    gain.gain.value = this.level;
    source.connect(gain);
    let analyser: AnalyserNode | null = null;
    try {
      analyser = context.createAnalyser();
      analyser.fftSize = 256;
      gain.connect(analyser);
      analyser.connect(context.destination);
    } catch {
      gain.connect(context.destination);
    }

    const offset = Math.min((entry.startMs ?? 0) / 1000, clip.buffer.duration);
    let length = clip.buffer.duration - offset;
    if (entry.endMs !== undefined) length = Math.min(length, (entry.endMs - (entry.startMs ?? 0)) / 1000);
    length = Math.max(length, 0.001);

    const playback: LoopPlayback = {
      source, gain, analyser, start: offset, end: offset + length,
      startedAt: context.currentTime, offset, region: length / rate, repeats: 0,
    };
    this.current = { entry, audio: null, loop: playback };
    this.status = STATUS_PLAYING;

    const generation = this.generation;
    source.onended = () => {
      try { source.disconnect(); gain.disconnect(); } catch { /* already */ }
      if (this.generation !== generation) return;
      this.current = null;
      this.advance();
    };
    source.start(0, offset, length);
  }

  /**
   * The Web Audio path: one decoded buffer, looped between the offsets that
   * hold actual sound.
   *
   * ⚠ `loopEnd` is what makes this different from `audio.loop`. The source keeps
   * playing across the boundary within one scheduled node, so there is no event,
   * no `play()` round trip and no format padding — the two edges are joined
   * sample to sample.
   */
  private startLoop(entry: QueuedSound, clip: DecodedLoop): void {
    const context = contextFor();
    if (!context) { this.startElement(entry); return; }

    // `the duration of member` (ms — see `durationOf`); the decode knows it
    // exactly, which the manifest does not carry.
    entry.member.duration = durationOf(clip.buffer.duration);

    const source = context.createBufferSource();
    source.buffer = clip.buffer;
    source.loop = true;
    source.loopStart = clip.start;
    source.loopEnd = clip.end;
    /**
     * `#rateShift` — see `QueuedSound.rateShift`. Web Audio expresses pitch as
     * a rate multiplier, which is exactly what the semitone conversion yields.
     *
     * ⚠ THIS ALSO STRETCHES TIME. A rate of 0.5 makes every pass take TWICE as
     * long, so any scheduling computed from `clip` duration has to be divided
     * by the rate or a shifted loop is cut off mid-pass — see where `region`
     * is used to schedule the stop below.
     */
    const rate = rateFromShift(entry.rateShift);
    source.playbackRate.value = rate;
    const gain = context.createGain();
    gain.gain.value = this.level;
    source.connect(gain);
    let analyser: AnalyserNode | null = null;
    try {
      analyser = context.createAnalyser();
      analyser.fftSize = 256;
      gain.connect(analyser);
      analyser.connect(context.destination);
    } catch {
      gain.connect(context.destination);
    }

    /**
     * `the loop of member` is endless; `#loopCount` is a fixed number of passes.
     * Both loop the same way — the difference is only when the node stops, and
     * one `stop(when)` on the context clock ends it sample-accurately at the end
     * of the last pass. Turning `source.loop` off on a timer instead would let
     * the region start over and be cut mid-way.
     */
    // ⚠ WALL-CLOCK, NOT BUFFER SECONDS. `stop(when)` is scheduled on the context
    // clock, so a pitch-shifted pass has to be divided by the rate: at
    // `rateShift -12` (rate 0.5) a pass takes twice as long, and using the raw
    // buffer length would cut every loop off halfway through.
    const region = Math.max((clip.end - clip.start) / rate, 0.001);
    const repeats = entry.member.loop ? 0 : Math.max(1, Math.trunc(entry.loopCount));

    const playback: LoopPlayback = {
      source, gain, analyser, start: clip.start, end: clip.end,
      startedAt: context.currentTime, offset: clip.start,
      region, repeats,
    };
    this.current = { entry, audio: null, loop: playback };
    this.status = STATUS_PLAYING;

    // `breakLoop` clears `source.loop`, so the node then runs to the end and
    // stops — which is the moment the play list should move on.
    const generation = this.generation;
    source.onended = () => {
      if (this.generation !== generation) return;
      this.current = null;
      this.advance();
    };
    source.start(0, clip.start);
    if (repeats > 0) source.stop(playback.startedAt + repeats * region);
    if (context.state === "suspended") {
      hookGesture();
      blocked.add(() => void context.resume().catch(() => undefined));
    }
  }

  /** Bumped by `silence`: an `onended` from before a stop must not idle a newer chain. */
  private chainEpoch = 0;

  /**
   * Book one exact clip on the audio clock: right after the previous one if the
   * chain is running, else at the shared start for this tick — see `ExactClip`
   * and `sharedStart`. The NEXT clip is booked ~200 ms before this one ends, so
   * joins are sample-accurate rather than waiting on an `ended` event.
   */
  private startExact(entry: QueuedSound, clip: ExactClip): void {
    const context = contextFor();
    if (!context) { this.startElement(entry); return; }
    entry.member.duration = durationOf(clip.end - clip.start);

    const rate = rateFromShift(entry.rateShift);
    const offset = Math.min(clip.start + (entry.startMs ?? 0) / 1000, clip.end);
    let length = clip.end - offset;
    // `#endTime` crops — the metronome's 1777 ms.
    if (entry.endMs !== undefined) length = Math.min(length, (entry.endMs - (entry.startMs ?? 0)) / 1000);
    length = Math.max(length, 0.001);
    const when = this.chainEnd > context.currentTime ? this.chainEnd : sharedStart(context);

    const source = context.createBufferSource();
    source.buffer = clip.buffer;
    source.playbackRate.value = rate;
    const gain = context.createGain();
    gain.gain.value = this.level;
    source.connect(gain);
    let analyser: AnalyserNode | null = null;
    try {
      analyser = context.createAnalyser();
      analyser.fftSize = 256;
      gain.connect(analyser);
      analyser.connect(context.destination);
    } catch {
      gain.connect(context.destination);
    }
    source.start(when, offset, length);

    const wall = length / rate;
    const playback: LoopPlayback = {
      source, gain, analyser, start: offset, end: offset + length,
      startedAt: when, offset, region: wall, repeats: 1,
    };
    this.current = { entry, audio: null, loop: playback };
    this.scheduled.add(playback);
    this.status = STATUS_PLAYING;
    this.chainEnd = when + wall;

    const epoch = this.chainEpoch;
    source.onended = () => {
      this.scheduled.delete(playback);
      try { source.disconnect(); gain.disconnect(); } catch { /* already */ }
      if (epoch !== this.chainEpoch) return;
      if (this.scheduled.size === 0 && this.queue_.length === 0) {
        if (this.current?.loop === playback) this.current = null;
        this.status = STATUS_IDLE;
        this.chainEnd = 0;
      }
    };

    /**
     * ⚠ BOOK THE REST NOW, ON THE AUDIO CLOCK — NOT ON A TIMER.
     *
     * The first version booked each next clip from a `setTimeout` ~200 ms before
     * the current one ended. A timer is only as punctual as the main thread: a
     * room load, a long frame or GC, or Firefox throttling (a background tab's
     * timers run up to a second late) fired it after the clip had ended, that
     * channel started its next clip late, and stayed late — the tracks "fall
     * behind / desync". Every queued clip that is already decoded is booked here,
     * back to back, so nothing downstream depends on JavaScript timing at all.
     */
    while (this.queue_.length > 0) {
      const next = this.queue_[0]!;
      if (next.member.loop || next.loopCount > 1) break;
      const ready = exact.get(next.member.soundPath);
      if (!ready || ready instanceof Promise) break;
      this.queue_.shift();
      this.bookExact(context, next, ready, epoch);
    }

    // Anything left (still decoding, or not an exact clip) takes the old path.
    if (this.chainTimer) clearTimeout(this.chainTimer);
    if (this.queue_.length > 0) {
      const lead = Math.max(0, (this.chainEnd - context.currentTime - 0.2) * 1000);
      this.chainTimer = setTimeout(() => {
        this.chainTimer = null;
        if (epoch === this.chainEpoch && this.queue_.length > 0) this.advance();
      }, lead);
    }

    if (context.state === "suspended") {
      hookGesture();
      blocked.add(() => void context.resume().catch(() => undefined));
    }
  }

  /** Book one more exact clip right behind the chain — see `startExact`. */
  private bookExact(context: AudioContext, entry: QueuedSound, clip: ExactClip, epoch: number): void {
    entry.member.duration = durationOf(clip.end - clip.start);
    const rate = rateFromShift(entry.rateShift);
    const offset = Math.min(clip.start + (entry.startMs ?? 0) / 1000, clip.end);
    let length = clip.end - offset;
    if (entry.endMs !== undefined) length = Math.min(length, (entry.endMs - (entry.startMs ?? 0)) / 1000);
    length = Math.max(length, 0.001);
    const when = Math.max(this.chainEnd, context.currentTime);

    const source = context.createBufferSource();
    source.buffer = clip.buffer;
    source.playbackRate.value = rate;
    const gain = context.createGain();
    gain.gain.value = this.level;
    source.connect(gain);
    gain.connect(context.destination);
    source.start(when, offset, length);

    const wall = length / rate;
    const playback: LoopPlayback = {
      source, gain, analyser: null, start: offset, end: offset + length,
      startedAt: when, offset, region: wall, repeats: 1, entry,
    };
    this.scheduled.add(playback);
    this.chainEnd = when + wall;
    source.onended = () => {
      this.scheduled.delete(playback);
      try { source.disconnect(); gain.disconnect(); } catch { /* already */ }
      if (epoch !== this.chainEpoch) return;
      if (this.current?.loop !== playback && this.scheduled.size > 0) {
        // The clip now sounding is the earliest still booked.
        const first = [...this.scheduled].sort((a, b) => a.startedAt - b.startedAt)[0];
        if (first) this.current = { entry: this.current?.entry ?? entry, audio: null, loop: first };
      }
      if (this.scheduled.size === 0 && this.queue_.length === 0) {
        this.current = null;
        this.status = STATUS_IDLE;
        this.chainEnd = 0;
      }
    };
  }

  private startElement(entry: QueuedSound): void {
    const audio = elementFor(entry.member.soundPath);
    if (!audio) {
      // No audio support (the Node smoke test). Treat as finished so a caller
      // waiting on the channel is not stuck forever.
      this.status = STATUS_IDLE;
      return;
    }
    captureDuration(audio, entry.member);

    // `the loop of member` means endless; `#loopCount` means a fixed number of
    // repeats, which is handled by re-queuing on `ended`. A looping member only
    // reaches here when Web Audio is unavailable or the decode failed, so the
    // flag still has to be honoured — with the format padding this path cannot
    // avoid.
    audio.loop = entry.member.loop ? true : false;
    /**
     * `#rateShift` on the fallback path too — see `QueuedSound.rateShift`.
     *
     * ⚠ `preservesPitch` MUST BE OFF. It defaults to true, which is the right
     * choice for speech but the exact opposite of what Director means here:
     * `rateShift` IS a pitch change, so leaving the correction on would resample
     * the sound back to its original pitch and silently undo the shift.
     */
    audio.playbackRate = rateFromShift(entry.rateShift);
    audio.preservesPitch = false;
    audio.currentTime = 0;
    this.current = { audio, entry, loop: null };
    this.syncVolume();
    this.status = STATUS_PLAYING;

    const onEnded = () => {
      audio.removeEventListener("ended", onEnded);
      if (this.current?.audio !== audio) return;
      if (entry.loopCount > 1) {
        this.current = null;
        this.queue_.unshift({ member: entry.member, loopCount: entry.loopCount - 1, rateShift: entry.rateShift });
      } else {
        this.current = null;
      }
      this.advance();
    };
    audio.addEventListener("ended", onEnded);

    // Fallback path only (an undecodable clip): never let a missing `ended`
    // strand the channel — see the note in `advance`. Generous: the clip's own
    // length plus a second, or 10 s when the length is not known yet.
    if (!audio.loop && entry.loopCount <= 1) {
      const known = Number.isFinite(audio.duration) && audio.duration > 0;
      const limit = known ? (audio.duration / Math.max(audio.playbackRate, 0.01)) * 1000 + 1000 : 10_000;
      setTimeout(() => {
        if (this.current?.audio !== audio) return;
        audio.removeEventListener("ended", onEnded);
        audio.pause();
        this.current = null;
        this.advance();
      }, limit);
    }

    const started = audio.play();
    if (started && typeof started.catch === "function") {
      started.catch(() => {
        /**
         * ⚠ A REFUSED ONE-SHOT IS DROPPED, NOT PARKED.
         *
         * Parking it kept it the channel's `current`: its `ended` never fired,
         * every later sound for the channel queued up behind it, and the next
         * click released the whole backlog at once — the user's "audio falls
         * behind, then plays everything it needs to catch up" (Firefox refuses
         * `play()` more readily, e.g. in an unfocused tab). Director never
         * refuses a sound; a moment that has passed is skipped, not replayed
         * late. Loops (room ambience, music) still resume on the next gesture.
         */
        hookGesture();
        if (!audio.loop && entry.loopCount <= 1) {
          if (this.current?.audio === audio) {
            this.current = null;
            this.advance();
          }
          return;
        }
        blocked.add(() => {
          if (this.current?.audio === audio) void audio.play().catch(() => undefined);
        });
      });
    }
  }

  /**
   * Silence whatever is playing, without touching the play list or the status —
   * the callers below each decide what those become.
   *
   * ⚠ Bumps the generation FIRST. A Web Audio node fires `onended` when it is
   * stopped, and that handler would otherwise pull the next clip off the list on
   * a channel that was just told to stop.
   */
  private silence(): void {
    this.generation++;
    // The whole booked chain, not just the clip playing now.
    this.chainEpoch++;
    if (this.chainTimer) { clearTimeout(this.chainTimer); this.chainTimer = null; }
    this.chainEnd = 0;
    for (const booked of this.scheduled) {
      try { booked.source.stop(); } catch { /* not started yet, or done */ }
      try { booked.source.disconnect(); booked.gain.disconnect(); } catch { /* already */ }
    }
    const wasChained = this.current?.loop !== undefined && this.current?.loop !== null && this.scheduled.has(this.current.loop);
    this.scheduled.clear();
    if (wasChained) return;
    if (!this.current) return;
    if (this.current.audio) {
      this.current.audio.pause();
      this.current.audio.currentTime = 0;
    }
    if (this.current.loop) {
      try {
        this.current.loop.source.stop();
      } catch {
        // Already stopped — Web Audio throws rather than ignoring it.
      }
      this.current.loop.source.disconnect();
      this.current.loop.gain.disconnect();
    }
  }

  stop(): void {
    this.clearFade();
    this.silence();
    this.current = null;
    this.queue_ = [];
    this.status = STATUS_IDLE;
  }

  /**
   * ⚠ PAUSING A LOOP RESTARTS IT. A Web Audio source cannot be resumed once
   * stopped, and reconstructing the exact offset would be guesswork against the
   * context clock. Nothing in VMK pauses or rewinds a sound channel — the only
   * `#pause` and `#rewind` symbols in the port are animation states — so the
   * approximation is stated here rather than built on a case that never runs.
   */
  pause(): void {
    if (!this.current) return;
    if (this.current.audio) {
      this.current.audio.pause();
      this.status = STATUS_PAUSED;
      return;
    }
    const entry = this.current.entry;
    this.silence();
    this.current = null;
    this.queue_.unshift(entry);
    this.status = STATUS_PAUSED;
  }

  rewind(): void {
    if (!this.current) return;
    if (this.current.audio) { this.current.audio.currentTime = 0; return; }
    const entry = this.current.entry;
    const clip = decoded.get(entry.member.soundPath);
    this.silence();
    this.current = null;
    if (clip && !(clip instanceof Promise)) {
      if (entry.member.loop || entry.loopCount > 1) this.startLoop(entry, clip);
      else this.startOneShot(entry, clip);
    }
  }

  playNext(): void {
    this.silence();
    this.current = null;
    this.advance();
  }

  /** `breakLoop` — finish the current pass, then stop repeating. */
  breakLoop(): void {
    if (!this.current) return;
    if (this.current.audio) this.current.audio.loop = false;
    if (this.current.loop) this.current.loop.source.loop = false;
  }

  private clearFade(): void {
    if (this.fadeTimer) clearInterval(this.fadeTimer);
    this.fadeTimer = null;
  }

  /**
   * Ramp `fade` to a target over `ms`.
   *
   * Director takes the fade time in TICKS. Stepping on a timer rather than
   * using WebAudio ramps keeps this working for plain `Audio` elements, which
   * is what the rest of this module uses.
   */
  private rampTo(target: number, ticks: LingoValue, endsSound = false): void {
    this.clearFade();
    const ms = Math.max(0, (Number(ticks) || 0) / TICKS_PER_SECOND * 1000);
    /**
     * ⚠ A FADE-OUT'S ENVELOPE ENDS WITH ITS SOUND. Director's fade is on the
     * PLAYING sound — `fadeIn` "rises to the current volume setting" — not a
     * lasting change to the channel. Leaving `fade` at 0 after the stop made
     * every later clip on that channel play at volume 0, and VMK shares only
     * three channels between music and effects (`CSoundChannelAllocator`): the
     * monorail train's `SetFadeOut(3)` on its music silenced the station's door
     * sounds from then on — MEASURED as `MR-doors-open` playing to 1.12 s with
     * `volume = 0` — which is why the platform "only did its spiel once".
     */
    const finish = () => {
      if (target !== 0) return;
      this.stop();
      if (endsSound) {
        this.fade = 1;
      }
    };
    if (ms === 0) {
      this.fade = target;
      this.syncVolume();
      finish();
      return;
    }
    const step = 50;
    const from = this.fade;
    const started = Date.now();
    this.fadeTimer = setInterval(() => {
      const progress = Math.min(1, (Date.now() - started) / ms);
      this.fade = from + (target - from) * progress;
      this.syncVolume();
      if (progress >= 1) {
        this.clearFade();
        // A fade to silence is a stop, which is what `fadeOut` means; leaving
        // the clip running at zero would hold the channel busy forever.
        finish();
      }
    }, step);
  }

  fadeIn(ticks: LingoValue): void {
    this.fade = 0;
    if (!this.current) this.play();
    this.rampTo(1, ticks);
  }

  fadeOut(ticks: LingoValue): void {
    this.rampTo(0, ticks, true);
  }

  fadeTo(level: LingoValue, ticks: LingoValue): void {
    this.rampTo(Math.min(1, Math.max(0, (Number(level) || 0) / MAX_VOLUME)), ticks);
  }
}

const channels = new Map<number, SoundChannel>();

/**
 * The Lingo-facing channel object for `sound(n)`.
 *
 * ⚠ The SAME object every call. VMK stores channel references
 * (`m_r_SndChannel`) and compares them with `objectp`, and a fresh object per
 * lookup would lose every setting and break those comparisons.
 */
export function soundChannelFor(index: number): LingoValue {
  let state = channels.get(index);
  if (!state) {
    state = new SoundChannel(index);
    channels.set(index, state);
  }
  const channel = state;
  return {
    channel: index,
    get volume() { return channel.volume; },
    set volume(value: number) { channel.volume = Number(value) || 0; channel.syncVolume(); },
    get pan() { return channel.pan; },
    set pan(value: number) { channel.pan = Number(value); },
    get status() { return channel.status; },
    get loopCount() { return channel.loopCount; },
    set loopCount(value: number) { channel.loopCount = Number(value) || 0; },
    stop: () => { channel.stop(); return VOID; },
    isBusy: () => channel.isBusy(),
    pause: () => { channel.pause(); return VOID; },
    play: (value?: LingoValue) => { channel.play(value); return VOID; },
    playNext: () => { channel.playNext(); return VOID; },
    rewind: () => { channel.rewind(); return VOID; },
    breakLoop: () => { channel.breakLoop(); return VOID; },
    queue: (value: LingoValue) => { channel.queue(value); return VOID; },
    fadeIn: (ticks: LingoValue) => { channel.fadeIn(ticks); return VOID; },
    fadeOut: (ticks: LingoValue) => { channel.fadeOut(ticks); return VOID; },
    fadeTo: (level: LingoValue, ticks: LingoValue) => { channel.fadeTo(level, ticks); return VOID; },
    getPlayList: () => channel.getPlayList(),
    setPlayList: (list: LingoValue) => { channel.setPlayList(list); return VOID; },
  } as unknown as LingoValue;
}

/** Stop every channel — `sound stop` / leaving a room. */
export function stopAllSound(): void {
  for (const channel of channels.values()) channel.stop();
}

/** Diagnostics for the boot page. */
export function soundStats(): {
  channels: number;
  playing: number;
  cached: number;
  blocked: number;
  live: Array<Record<string, unknown>>;
} {
  let playing = 0;
  for (const channel of channels.values()) if (channel.status === STATUS_PLAYING) playing++;
  /**
   * ⚠ The ELEMENTS, not just the counts. A clip that is looping and a clip that
   * is silently between passes both report `playing`, and the gap between them
   * is exactly the thing worth measuring — so the probe has to see
   * `currentTime`, `loop` and `paused` on the real element.
   */
  const live: Array<Record<string, unknown>> = [];
  for (const channel of channels.values()) {
    const state = channel.describe();
    if (state) live.push(state);
  }
  return { channels: channels.size, playing, cached: media.size, blocked: blocked.size, live };
}
