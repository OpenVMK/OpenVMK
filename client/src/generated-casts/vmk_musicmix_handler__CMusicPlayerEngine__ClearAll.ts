// vmk_musicmix_handler.cct / CMusicPlayerEngine / ClearAll

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ClearAll(_me: LingoMe) {
  setMeProp(_me, "m_mp_TrackData", new LingoPropList([]));
  for (var i = 1; i <= 4; ++i) {
  callMethod("addProp", meProp(_me, "m_mp_TrackData"), callNamed("string", i), new LingoList([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]))
  }

}

