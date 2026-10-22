// 0e4feeca6184e908b7fbd03d6d41b7b8.cct / Multiuser Instance Class / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  var pDecoder = 0;
  setMeProp(_me, "pBinDataCallback", new LingoPropList([symbol("client"), "", symbol("method"), undefined]));
  setMeProp(_me, "pConnectionShouldBeKilled", 0);
  setMeProp(_me, "pCommandsPntr", callNamed("getStructVariable", "struct.pointer"));
  setMeProp(_me, "pListenersPntr", callNamed("getStructVariable", "struct.pointer"));
  callMethod("setLogMode", _me, callNamed("getIntVariable", "connection.log.level", 0))
  setMeProp(_me, "pMsgStruct", callNamed("getStructVariable", "struct.message"));
  return 1;
}

