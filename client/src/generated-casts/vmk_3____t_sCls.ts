// vmk_3.dcr /  / t_sCls

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function t_sCls(_me: LingoMe, t_status: LingoValue, _TradeRequest: LingoValue) {
  if ((lingoTruthy(callMethod("managerExists", t_status, _TradeRequest)) ? 0 : 1)) {
  callNamed("session", callNamed("sprite", t_status, lingoBinary("join", "Referred object not found:", _TradeRequest), symbol("t_sCls")))
  }

  if (lingoBinary("neq", callNamed("GetStrFrom", t_status.register, _TradeRequest), 0)) {
  callNamed("session", callNamed("sprite", t_status, lingoBinary("join", "Manager alreay registered:", _TradeRequest), symbol("t_sCls")))
  callNamed("scriptText", t_status.setID, _TradeRequest)
  callNamed("_SellConfirmResponse", t_status.register, _TradeRequest)
  callNamed("session", 1)
  }

}

