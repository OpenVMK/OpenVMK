// vmk_3.dcr /  / string

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _string(_me: LingoMe, t_status: LingoValue, _TradeRequest: LingoValue) {
  if (callNamed("headers", callMethod("pObjectList", t_status.cancel, _TradeRequest))) {
  callNamed("session", 0)
  }

  if (lingoBinary("gt", callNamed("type", t_status.tDelayID, callMethod("pObjectList", t_status.cancel, _TradeRequest)), 0)) {
  callNamed("session", 0)
  }

  callMethod("GetLockState", t_status.tDelayID, callMethod("pObjectList", t_status.cancel, _TradeRequest))
  if ((lingoTruthy(t_status.getPos) ? 0 : 1)) {
  if (callNamed("headers", t_status.getOne)) {
  setThePropOf(t_status, "getOne", callMethod("cursor", callNamed("xtra", lingoBinary("join", "objectmanager", theProperty("moviePath"))), lingoBinary("mul", lingoBinary("mul", 60, 1000), 60), symbol("getPropAt"), t_status));
  callNamed("session", 1)
  }

  }

}

