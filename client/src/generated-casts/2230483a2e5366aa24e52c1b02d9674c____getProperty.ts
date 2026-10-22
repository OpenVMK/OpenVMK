// 2230483a2e5366aa24e52c1b02d9674c.cct /  / getProperty

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getProperty(_me: LingoMe, tProp: LingoValue) {
  /* global */ var pChars = globalVar("pChars");
  /* global */ var pCharsI = globalVar("pCharsI");
  /* global */ var pFirst = globalVar("pFirst");
  var Variable_0_1 = tProp;
  if (lingoBinary("eq", Variable_0_1, symbol("xtra"))) {
  return _me.pXtra;
  } else {
  if (lingoBinary("eq", Variable_0_1, symbol("host"))) {
  return _me.pHost;
  } else {
  if (lingoBinary("eq", Variable_0_1, symbol("port"))) {
  return _me.pPort;
  } else {
  if (lingoBinary("eq", Variable_0_1, symbol("decoder"))) {
  return callNamed("getDecoder", _me);
  } else {
  if (lingoBinary("eq", Variable_0_1, symbol("logmode"))) {
  return callNamed("getLogMode", _me);
  } else {
  if (lingoBinary("eq", Variable_0_1, symbol("listener"))) {
  return _me.pListenersPntr;
  } else {
  if (lingoBinary("eq", Variable_0_1, symbol("commands"))) {
  return _me.pCommandsPntr;
  } else {
  if (lingoBinary("eq", Variable_0_1, symbol("message"))) {
  return _me.pMsgStruct;
  }

  }

  }

  }

  }

  }

  }

  }

  return 0;
}

