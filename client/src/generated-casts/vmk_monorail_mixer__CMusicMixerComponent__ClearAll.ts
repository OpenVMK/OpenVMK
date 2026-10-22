// vmk_monorail_mixer.cct / CMusicMixerComponent / ClearAll

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ClearAll(_me: LingoMe) {
  for (var i = 1; i <= meProp(_me, "m_mp_TrackData").count; ++i) {
  for (var e = 1; e <= meProp(_me, "m_mp_TrackData")[i].count; ++e) {
  if (lingoBinary("neq", meProp(_me, "m_mp_TrackData")[i][e], 0)) {
  callMethod("RemoveSample", _me, i, e)
  }

  }

  }

  setMeProp(_me, "m_mp_TrackData", new LingoPropList([]));
  setMeProp(_me, "m_mp_LongSamples", new LingoPropList([]));
  for (var i = 1; i <= 4; ++i) {
  callMethod("addProp", meProp(_me, "m_mp_TrackData"), callNamed("string", i), new LingoList([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]))
  callMethod("addProp", meProp(_me, "m_mp_LongSamples"), callNamed("string", i), new LingoPropList([]))
  }

}

