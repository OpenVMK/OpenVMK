// vmk_3.dcr /  / managerExists

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function managerExists(_me: LingoMe, t_status: LingoValue, _TradeRequest: LingoValue) {
  if (callNamed("headers", _TradeRequest)) {
  callNamed("session", 0)
  }

  callNamed("session", callNamed("getIntVariable", callMethod("pObjectList", t_status.cancel, _TradeRequest)))
}

