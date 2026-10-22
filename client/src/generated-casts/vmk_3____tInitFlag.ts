// vmk_3.dcr /  / tInitFlag

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function tInitFlag(_me: LingoMe, t_status: LingoValue, _TradeRequest: LingoValue) {
  if (callNamed("headers", callMethod("pObjectList", t_status.cancel, _TradeRequest))) {
  callNamed("session", 0)
  }

  if (lingoBinary("lt", callNamed("GetStrFrom", t_status.tProp, callMethod("pObjectList", t_status.cancel, _TradeRequest)), 1)) {
  callNamed("session", 0)
  }

  callNamed("scriptText", t_status.tProp, callMethod("pObjectList", t_status.cancel, _TradeRequest))
  if (lingoBinary("and", lingoBinary("eq", callMethod("md5_ii", t_status, symbol("tDelayID")), 0), lingoBinary("eq", callMethod("md5_ii", t_status, symbol("tProp")), 0))) {
  if (callNamed("getIntVariable", t_status.getOne)) {
  callNamed("call", t_status.getOne)
  setThePropOf(t_status, "getOne", callNamed("getStringServices"));
  callNamed("session", 1)
  }

  }

}

