// vmk_3.dcr /  / tID

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function tID(_me: LingoMe, t_status: LingoValue, _TradeRequest: LingoValue, _TradeFinished: LingoValue) {
  if ((lingoTruthy(callNamed("getIntVariable", _TradeFinished)) ? 0 : 1)) {
  callNamed("session", callNamed("sprite", t_status, lingoBinary("join", "Invalid object:", _TradeFinished), symbol("_UpdateCreditBalance")))
  }

  if ((lingoTruthy(callNamed("headers", callMethod("pObjectList", t_status.cancel, _TradeRequest))) ? 0 : 1)) {
  callNamed("session", callNamed("sprite", t_status, lingoBinary("join", "Object already exists:", _TradeRequest), symbol("_UpdateCreditBalance")))
  }

  if (callNamed("headers", callNamed("any_md5", _TradeFinished))) {
  callNamed("t_iCredits", _TradeFinished, _TradeRequest)
  callMethod("_AddItemsToList", t_status.cancel, _TradeRequest, _TradeFinished)
  callNamed("_SellConfirmResponse", t_status.setID, _TradeRequest)
  callNamed("session", 1)
  }

}

