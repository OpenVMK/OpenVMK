// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / CRoomItemSound / StopSound

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StopSound(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_LoopSnd_obj"))) {
  callMethod("StopSound", meProp(_me, "m_LoopSnd_obj"))
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_LoopSnd_obj")))
  setMeProp(_me, "m_LoopSnd_obj", undefined);
  }

}

