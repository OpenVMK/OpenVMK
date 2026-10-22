// 2230483a2e5366aa24e52c1b02d9674c.cct / CConnection / ToInt

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ToInt(_me: LingoMe, _this: LingoValue, a_iNum: LingoValue) {
  /* global */ var pChars = globalVar("pChars");
  /* global */ var pCharsI = globalVar("pCharsI");
  /* global */ var pFirst = globalVar("pFirst");
  if (lingoBinary("lt", a_iNum, 0)) {
  var t_iNegMask = 4;
  a_iNum = -float(a_iNum);
  } else {
  t_iNegMask = 0;
  }

  var t_sNum = callNamed("numToChar", lingoBinary("add", 64, callNamed("bitAnd", a_iNum, 3)));
  var t_iLen = 1;
  a_iNum = lingoBinary("div", a_iNum, 4);
  var t_sStr = "";
  while (lingoBinary("neq", a_iNum, 0)) {
  t_sStr = lingoBinary("join", t_sStr, callNamed("numToChar", lingoBinary("add", 64, callNamed("bitAnd", a_iNum, 63))));
  t_iLen = lingoBinary("add", t_iLen, 1);
  a_iNum = lingoBinary("div", a_iNum, 64);
  }

  if (lingoBinary("neq", t_iLen, 1)) {
  return lingoBinary("join", callNamed("numToChar", callNamed("bitOr", callNamed("bitOr", callNamed("charToNum", t_sNum.char[1]), lingoBinary("mul", t_iLen, 8)), t_iNegMask)), callNamed("chars", t_sStr, 1, t_iLen));
  } else {
  return callNamed("numToChar", callNamed("bitOr", callNamed("bitOr", callNamed("charToNum", t_sNum.char[1]), lingoBinary("mul", t_iLen, 8)), t_iNegMask));
  }

}

