// vmk_tent_handler.cct / CTentHandlerComponent / deconstruct

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
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_stage"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_stage")))
  }

  return 1;
}

