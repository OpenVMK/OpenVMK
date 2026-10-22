// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLParser / _DTD_ParseContents

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _DTD_ParseContents(_me: LingoMe, _this: LingoValue, a_sInput: LingoValue, a_mp_sOutput: LingoValue) {
  var t_sDelim = theProperty("itemDelimiter");
  setTheProperty("itemDelimiter", ",");
  if (lingoBinary("starts", a_sInput, "(")) {
  var t_sData = callNamed("chars", a_sInput, 2, lingoBinary("sub", callNamed("length", a_sInput), 1));
  } else {
  t_sData = a_sInput;
  }

  var t_iCount = chunkCount(t_sData, "item");
  for (var i = 1; i <= t_iCount; ++i) {
  var t_sElem = chunkOf(chunkOf(t_sData, "item", i, 0), "word", 1, 0);
  switch (lastChunk(t_sElem, "char")) {
case "*":
case "?":
case "+":
  t_sElem = callNamed("chars", t_sElem, 1, lingoBinary("sub", callNamed("length", t_sElem), 1));
  callMethod("setaProp", a_mp_sOutput, t_sElem, "*")
  break;
case ")":
  callNamed("error", _this, "Conditional element content not supported!", symbol("_DTD_ParseContents"))
  break;
  default:
  callMethod("setaProp", a_mp_sOutput, t_sData, "")
  break;
  break;
  }

  }

  setTheProperty("itemDelimiter", t_sDelim);
  return 1;
}

