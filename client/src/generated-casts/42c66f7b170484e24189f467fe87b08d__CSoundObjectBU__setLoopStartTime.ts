// 42c66f7b170484e24189f467fe87b08d.cct / CSoundObjectBU / setLoopStartTime

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setLoopStartTime(_me: LingoMe, a_iTime: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_mpSndProps"))) ? 0 : 1)) {
  meProp(_me, "m_mpSndProps")[symbol("loopStartTime")] = a_iTime;
  }

}

