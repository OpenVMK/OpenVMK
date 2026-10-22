// vmk_monorail_train_handler.cct / CMonorailTrainInterface / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("unregisterMessage", symbol("room_ready"))
  callNamed("unregisterMessage", symbol("room_leave"))
  callNamed("unregisterMessage", "TrainStartSong")
  callNamed("unregisterMessage", "TrainEndSong")
  callMethod("StopTrainMusic", _me)
  if (lingoBinary("neq", callNamed("getObject", "StarField"), 0)) {
  callNamed("removeObject", "StarField")
  }

  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rSndFX")))
  if (lingoBinary("neq", meProp(_me, "m_pTextScroller"), 0)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_pTextScroller")))
  }

  if (callNamed("objectp", meProp(_me, "m_rOscillator"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rOscillator")))
  }

  return 1;
}

