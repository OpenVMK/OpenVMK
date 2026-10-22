// 42c66f7b170484e24189f467fe87b08d.cct / CSoundChannelObject / TimeLeft

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

/**
 * HAND-CORRECTED: the busy countdown follows the clock, not the number of
 * timer calls — a hidden Chrome tab throttles `delay` to ~1/s, which held all
 * three shared channels "busy" for minutes and dropped every UI sound. See the
 * identical correction in vmk_sound__CSoundChannelObject__TimeLeft.ts.
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

