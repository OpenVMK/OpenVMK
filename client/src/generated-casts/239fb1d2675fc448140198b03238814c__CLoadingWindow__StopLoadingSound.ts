// 239fb1d2675fc448140198b03238814c.cct / CLoadingWindow / StopLoadingSound

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StopLoadingSound(_me: LingoMe, _this: LingoValue, a_sSoundName: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_LoopSnd_obj"))) {
  callMethod("StopSound", meProp(_me, "m_LoopSnd_obj"))
  callNamed("executeMessage", "LoadRoomSound")
  }

}

