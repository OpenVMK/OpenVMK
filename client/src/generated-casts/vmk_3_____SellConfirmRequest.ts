// vmk_3.dcr /  / _SellConfirmRequest

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _SellConfirmRequest(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_iRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iTyp = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iPrc = callMethod("GetIntFrom", a_rMsg.connection);
  callMethod("ShowSellRequest", callMethod("getInterface", _this), t_iRef, t_iTyp, t_iPrc)
}

