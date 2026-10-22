// d0e535313898676eb605277339b50f27.cct / CMagicMenu / _GenericError

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _GenericError(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var tCode = callMethod("GetIntFrom", a_rMsg.connection);
  switch (tCode) {
case 4522:
  callMethod("HandleUi", _this)
  break;
  }

}

