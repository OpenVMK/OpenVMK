// vmk_3.dcr / test / _TradeFinished

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _TradeFinished(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_dialogName = "trade.dialog.oppositeGender_window";
  if (lingoBinary("neq", callNamed("getWindow", t_dialogName), 0)) {
  callNamed("removeWindow", t_dialogName)
  }

  var t_iStatus = callMethod("GetIntFrom", a_rMsg.connection);
  if (lingoBinary("eq", t_iStatus, 1)) {
  callMethod("TradeCancelled", _this.component)
  }

  callMethod("TradeClose", _this.component)
}

