// vmk_sound.cct / CSoundChannelObject / TimeLeft

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

/**
 * HAND-CORRECTED: the channel's "busy" countdown follows the CLOCK, not the
 * number of timer calls.
 *
 * The original adds 10 ms per `delay(10, #TimeLeft)` call. Chrome throttles
 * timers in a hidden tab to ~1 per second (1 per minute after five minutes), so
 * while the tab was in the background every call stood for 1000 ms or more of
 * real time but was counted as 10. `CSoundChannelAllocator` gives UI clicks and
 * room one-shots only THREE channels and silently DROPS a sound when all three
 * read busy — so after switching tabs, the room's birds and doorbells held
 * every channel for minutes and interface sounds went missing until the
 * counters drained. Room ambience was unaffected: it uses other channels.
 *
 * `PlaySound` resets `m_iCounter` to 0 before the first call, which marks the
 * start. Never counts slower than the original (+10 per call).
 */
const startedAt = new WeakMap<object, number>();

export function TimeLeft(_me: LingoMe, _this: LingoValue) {
  const now = performance.now();
  const counter = Number(meProp(_me, "m_iCounter")) || 0;
  if (counter === 0 || !startedAt.has(_me as object)) startedAt.set(_me as object, now);
  const elapsed = Math.round(now - startedAt.get(_me as object)!);
  setMeProp(_me, "m_iCounter", Math.max(counter + 10, elapsed));
  setMeProp(_me, "m_iDurationLeft", lingoBinary("sub", meProp(_me, "m_iDuration"), meProp(_me, "m_iCounter")));
  if (lingoBinary("gt", meProp(_me, "m_iDurationLeft"), 0)) {
  setMeProp(_me, "m_iChannelStatus", meProp(_me, "m_iDurationLeft"));
  callMethod("delay", _this, 10, symbol("TimeLeft"))
  } else {
  setMeProp(_me, "m_sNowPlaying", undefined);
  setMeProp(_me, "m_iChannelStatus", 0);
  }

}

