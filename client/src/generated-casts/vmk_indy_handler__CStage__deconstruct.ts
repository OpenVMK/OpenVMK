// vmk_indy_handler.cct / CStage / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if (lingoBinary("neq", meProp(_me, "m_splines")[1], 0)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_splines")[1]))
  }

  if (lingoBinary("neq", meProp(_me, "m_splines")[2], 0)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_splines")[2]))
  }

  if (lingoBinary("neq", meProp(_me, "m_splines")[3], 0)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_splines")[3]))
  }

  return 1;
}

