// framework.dcr / test / _ReceiveCredits

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ReceiveCredits(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_iCredits = callMethod("GetIntFrom", a_rMsg.connection);
  callMethod("set", callNamed("getObject", symbol("session")), "user_credits", t_iCredits)
  callMethod("_UpdateCreditBalance", _this.component, t_iCredits)
}

