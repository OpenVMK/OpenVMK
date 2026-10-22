// 1d7a323290934c002c579db2d87d7992.cct / CHiddenMickeyHandler / LoginResult

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LoginResult(_me: LingoMe, tMsg: LingoValue) {
  var tResult = callMethod("GetIntFrom", tMsg.connection);
  switch (tResult) {
case 0:
  callNamed("put", "HiddenMickey.LoginSuccessfull")
  break;
case 1:
  break;
case 3:
  break;
case 5:
  break;
  default:
  callNamed("put", "HiddenMickey.UnknownLoginresult")
  }

}

