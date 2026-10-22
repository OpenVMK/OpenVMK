// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLParser / _DTD_ParseAttributes

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _DTD_ParseAttributes(_me: LingoMe, _this: LingoValue, a_sInput: LingoValue, a_mp_rOutput: LingoValue) {
  var t_mp_kKey_rAttr = new LingoPropList([symbol("type"), "", symbol("data"), symbol("default"), symbol("value"), ""]);
  var t_sAttr = chunkOf(a_sInput, "word", 1, 0);
  setThePropOf(t_mp_kKey_rAttr, "type", chunkOf(a_sInput, "word", 2, 0));
  var t_sData = chunkOf(a_sInput, "word", 3, chunkCount(a_sInput, "word"));
  if (lingoBinary("starts", t_sData, "#")) {
  switch (chunkOf(t_sData, "word", 1, 0)) {
case "#REQUIRED":
  setThePropOf(t_mp_kKey_rAttr, "data", symbol("required"));
  break;
case "#IMPLIED":
  setThePropOf(t_mp_kKey_rAttr, "data", symbol("implied"));
  break;
case "#FIXED":
  setThePropOf(t_mp_kKey_rAttr, "data", symbol("fixed"));
  setThePropOf(t_mp_kKey_rAttr, "value", chunkOf(t_sData, "word", 2, chunkCount(t_sData, "word")));
  break;
  }

  } else {
  if (lingoBinary("eq", chunkOf(t_sData, "char", 1, 0), "\"")) {
  t_sData = callNamed("chars", t_sData, 2, lingoBinary("sub", callNamed("length", t_sData), 1));
  }

  setThePropOf(t_mp_kKey_rAttr, "value", t_sData);
  }

  callMethod("setaProp", a_mp_rOutput, t_sAttr, t_mp_kKey_rAttr)
  return 1;
}

