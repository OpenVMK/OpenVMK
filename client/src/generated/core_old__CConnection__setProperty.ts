// core.old.cct / CConnection / setProperty

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setProperty(_me: LingoMe, tProp: LingoValue, tvalue: LingoValue) {
  switch (tProp) {
case symbol("decoder"):
  return callMethod("setDecoder", _me, tvalue);
case symbol("logmode"):
  return callMethod("setLogMode", _me, tvalue);
case symbol("listener"):
  if (lingoBinary("eq", callNamed("ilk", tvalue), symbol("struct"))) {
  setMeProp(_me, "pListenersPntr", tvalue);
  return 1;
  } else {
  return 0;
  }

  break;
case symbol("commands"):
  if (lingoBinary("eq", callNamed("ilk", tvalue), symbol("struct"))) {
  setMeProp(_me, "pCommandsPntr", tvalue);
  return 1;
  } else {
  return 0;
  }

  break;
  }

  return 0;
}

