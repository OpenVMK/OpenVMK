// core.old.cct / CConnectionDebug / ToInt

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ToInt(_me: LingoMe, _this: LingoValue, a_iNum: LingoValue) {
  if (lingoBinary("lt", a_iNum, 0)) {
  var t_iNegMask = 4;
  a_iNum = -float(a_iNum);
  } else {
  t_iNegMask = 0;
  }

  var t_sNum = callNamed("numToChar", lingoBinary("add", 64, callNamed("bitAnd", a_iNum, 3)));
  var t_iLen = 1;
  a_iNum = lingoBinary("div", a_iNum, 4);
  while (lingoBinary("neq", a_iNum, 0)) {
  t_iLen = lingoBinary("add", t_iLen, 1);
  t_sNum = t_sNum + callNamed("numToChar", lingoBinary("add", 64, callNamed("bitAnd", a_iNum, 63)));
  a_iNum = lingoBinary("div", a_iNum, 64);
  }

  return lingoBinary("join", callNamed("numToChar", callNamed("bitOr", callNamed("bitOr", callNamed("charToNum", chunkOf(t_sNum, "char", 1, 0)), lingoBinary("mul", t_iLen, 8)), t_iNegMask)), callNamed("chars", t_sNum, 2, t_iLen));
}

