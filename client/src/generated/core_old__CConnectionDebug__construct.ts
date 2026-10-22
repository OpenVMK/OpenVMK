// core.old.cct / CConnectionDebug / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "pEncryptionOn", 0);
  setMeProp(_me, "pMsgStruct", callNamed("getStructVariable", "struct.message"));
  callMethod("setaProp", meProp(_me, "pMsgStruct"), symbol("connection"), _me)
  setMeProp(_me, "pDecoder", 0);
  setMeProp(_me, "pLastContent", "");
  setMeProp(_me, "pConnectionShouldBeKilled", 0);
  setMeProp(_me, "pCommandsPntr", callNamed("getStructVariable", "struct.pointer"));
  setMeProp(_me, "pListenersPntr", callNamed("getStructVariable", "struct.pointer"));
  setMeProp(_me, "m_sDebugInput", "");
  setMeProp(_me, "m_sDebugOutput", "");
  callMethod("setLogMode", _me, callNamed("getIntVariable", "connection.log.level", 0))
  return 1;
}

