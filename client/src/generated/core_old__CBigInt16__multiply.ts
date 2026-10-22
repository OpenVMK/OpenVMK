// core.old.cct / CBigInt16 / multiply

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function multiply(_me: LingoMe, _this: LingoValue, a_rOperand: LingoValue) {
  var t_ar_iResult = new LingoList([]);
  callMethod("addAt", t_ar_iResult, lingoBinary("add", meProp(_me, "m_iLength"), a_rOperand.m_iLength), 0)
  for (var i = 1; i <= meProp(_me, "m_iLength"); ++i) {
  for (var j = 1; j <= a_rOperand.m_iLength; ++j) {
  var t_iProduct = lingoBinary("mul", meProp(_me, "m_ar_iValue")[i], a_rOperand.m_ar_iValue[j]);
  var k = lingoBinary("add", i, j);
  while (lingoBinary("neq", t_iProduct, 0)) {
  t_iProduct = lingoBinary("add", t_iProduct, t_ar_iResult[k]);
  t_ar_iResult[k] = callNamed("bitAnd", t_iProduct, meProp(_me, "m_iBitMask"));
  t_iProduct = callMethod("BitRight", _this, t_iProduct, meProp(_me, "m_iBitsPerWord"));
  k = lingoBinary("add", k, 1);
  }

  }

  }

  var t_rBigInt = callNamed("createObject", symbol("temp"), "CBigInt16");
  callMethod("setup", t_rBigInt, t_ar_iResult)
  return t_rBigInt;
}

