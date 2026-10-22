// 2230483a2e5366aa24e52c1b02d9674c.cct / CConnection / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  /* global */ var pChars = globalVar("pChars");
  /* global */ var pCharsI = globalVar("pCharsI");
  /* global */ var pFirst = globalVar("pFirst");
  setThePropOf(_me, "pMsgStruct", callNamed("getStructVariable", "struct.message"));
  callMethod("setaProp", _me.pMsgStruct, symbol("connection"), _me)
  setThePropOf(_me, "pDecoder", 0);
  setThePropOf(_me, "pLastContent", "");
  setThePropOf(_me, "pConnectionShouldBeKilled", 0);
  setThePropOf(_me, "pCommandsPntr", callNamed("getStructVariable", "struct.pointer"));
  setThePropOf(_me, "pListenersPntr", callNamed("getStructVariable", "struct.pointer"));
  callNamed("setLogMode", _me, callNamed("getIntVariable", "connection.log.level", 0))
  callNamed("prepareSanitization")
  return 1;
}

