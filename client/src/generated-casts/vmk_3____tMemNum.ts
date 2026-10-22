// vmk_3.dcr /  / tMemNum

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function tMemNum(_me: LingoMe, t_status: LingoValue, _TradeRequest: LingoValue) {
  if ((lingoTruthy(callNamed("GetStrFrom", t_status.register, _TradeRequest)) ? 0 : 1)) {
  callNamed("session", callNamed("sprite", t_status, lingoBinary("join", "Manager not found:", _TradeRequest), symbol("tMemNum")))
  }

  callNamed("session", callMethod("pObjectList", t_status.cancel, _TradeRequest))
}

