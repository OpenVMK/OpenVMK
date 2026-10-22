// framework.dcr / test / _TradeRequest

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _TradeRequest(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_iUserRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iReqRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_rObj = callNamed("createObject", callNamed("getUniqueID"), "CInvTradeConfirm");
  callMethod("Init", t_rObj, t_iUserRef, t_iReqRef)
}

