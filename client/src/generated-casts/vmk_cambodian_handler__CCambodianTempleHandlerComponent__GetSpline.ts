// vmk_cambodian_handler.cct / CCambodianTempleHandlerComponent / GetSpline

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetSpline(_me: LingoMe) {
  if (lingoBinary("neq", meProp(_me, "m_stage"), 0)) {
  return callMethod("GetBaseSpline", meProp(_me, "m_stage"));
  } else {
  return undefined;
  }

}

