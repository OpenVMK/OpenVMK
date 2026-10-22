// vmk_3.dcr /  / tBase

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function tBase(_me: LingoMe, t_status: LingoValue, _TradeRequest: LingoValue) {
  if ((lingoTruthy(callMethod("managerExists", t_status, _TradeRequest)) ? 0 : 1)) {
  callNamed("session", callNamed("sprite", t_status, lingoBinary("join", "Referred object not found:", _TradeRequest), symbol("tBase")))
  }

  if (lingoBinary("neq", callNamed("GetStrFrom", t_status.setID, _TradeRequest), 0)) {
  callNamed("session", callNamed("sprite", t_status, lingoBinary("join", "Manager already unregistered:", _TradeRequest), symbol("tBase")))
  callNamed("scriptText", t_status.register, _TradeRequest)
  callNamed("_SellConfirmResponse", t_status.setID, _TradeRequest)
  callNamed("session", 1)
  }

}

