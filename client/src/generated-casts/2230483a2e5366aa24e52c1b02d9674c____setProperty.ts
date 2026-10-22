// 2230483a2e5366aa24e52c1b02d9674c.cct /  / setProperty

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setProperty(_me: LingoMe, tProp: LingoValue, tValue: LingoValue) {
  /* global */ var pChars = globalVar("pChars");
  /* global */ var pCharsI = globalVar("pCharsI");
  /* global */ var pFirst = globalVar("pFirst");
  var Variable_0_1 = tProp;
  if (lingoBinary("eq", Variable_0_1, symbol("decoder"))) {
  return callNamed("setDecoder", _me, tValue);
  } else {
  if (lingoBinary("eq", Variable_0_1, symbol("logmode"))) {
  return callNamed("setLogMode", _me, tValue);
  } else {
  if (lingoBinary("eq", Variable_0_1, symbol("listener"))) {
  if (lingoBinary("eq", callNamed("ilk", tValue), symbol("struct"))) {
  setThePropOf(_me, "pListenersPntr", tValue);
  return 1;
  } else {
  return 0;
  }

  } else {
  if (lingoBinary("eq", Variable_0_1, symbol("commands"))) {
  if (lingoBinary("eq", callNamed("ilk", tValue), symbol("struct"))) {
  setThePropOf(_me, "pCommandsPntr", tValue);
  return 1;
  } else {
  return 0;
  }

  }

  }

  }

  }

  return 0;
}

