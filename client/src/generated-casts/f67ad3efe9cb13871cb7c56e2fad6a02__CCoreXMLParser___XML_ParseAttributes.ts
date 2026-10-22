// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLParser / _XML_ParseAttributes

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _XML_ParseAttributes(_me: LingoMe, _this: LingoValue, a_sInput: LingoValue, a_mp_rOutput: LingoValue) {
  var t_sInput = a_sInput;
  var t_sDelim = theProperty("itemDelimiter");
  while (1) {
  setTheProperty("itemDelimiter", "=");
  var t_sKey = chunkOf(chunkOf(t_sInput, "item", 1, 0), "word", 1, 0);
  if (lingoBinary("eq", t_sKey, "")) {
  break;
  }

  t_sInput = deleteStringChunk(t_sInput, "item", 1, 0);
  t_sInput = chunkOf(t_sInput, "word", 1, chunkCount(t_sInput, "word"));
  if (lingoBinary("eq", chunkCount(t_sInput, "item"), 0)) {
  break;
  }

  setTheProperty("itemDelimiter", "\"");
  if (lingoBinary("eq", chunkCount(t_sInput, "item"), 1)) {
  break;
  }

  var t_sValue = chunkOf(t_sInput, "item", 2, 0);
  t_sInput = deleteStringChunk(t_sInput, "item", 1, 0);
  t_sInput = deleteStringChunk(t_sInput, "item", 1, 0);
  callMethod("setaProp", a_mp_rOutput, t_sKey, t_sValue)
  }

  setTheProperty("itemDelimiter", t_sDelim);
  return 1;
}

