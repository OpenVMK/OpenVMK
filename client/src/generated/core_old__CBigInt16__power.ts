// core.old.cct / CBigInt16 / power

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function power(_me: LingoMe, _this: LingoValue, a_rBigIntExp: LingoValue, a_rBigIntMod: LingoValue) {
  var t_rResult = callNamed("createObject", symbol("temp"), "CBigInt16");
  var t_rBase = _this;
  for (var n = 1; n <= a_rBigIntExp.m_iLength; ++n) {
  var bit = 1;
  while (lingoBinary("lt", bit, meProp(_me, "m_iBitMask"))) {
  if (lingoBinary("neq", callNamed("bitAnd", a_rBigIntExp.m_ar_iValue[n], bit), 0)) {
  t_rResult = callMethod("Modulo", callMethod("multiply", t_rResult, t_rBase), a_rBigIntMod);
  }

  t_rBase = callMethod("Modulo", callMethod("multiply", t_rBase, t_rBase), a_rBigIntMod);
  }

  }

  return t_rResult;
}

