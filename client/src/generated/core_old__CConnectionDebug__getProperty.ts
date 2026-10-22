// core.old.cct / CConnectionDebug / getProperty

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getProperty(_me: LingoMe, tProp: LingoValue) {
  switch (tProp) {
case symbol("xtra"):
  return meProp(_me, "pXtra");
case symbol("host"):
  return meProp(_me, "pHost");
case symbol("port"):
  return meProp(_me, "pPort");
case symbol("decoder"):
  return callMethod("getDecoder", _me);
case symbol("logmode"):
  return callMethod("getLogMode", _me);
case symbol("listener"):
  return meProp(_me, "pListenersPntr");
case symbol("commands"):
  return meProp(_me, "pCommandsPntr");
case symbol("message"):
  return meProp(_me, "pMsgStruct");
  }

  return 0;
}

