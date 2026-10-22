// core.old.cct / CBigInt16 / setup

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setup(_me: LingoMe, _this: LingoValue, a_vInput: LingoValue) {
  switch (callNamed("ilk", a_vInput)) {
case symbol("integer"):
  var t_iValue = a_vInput;
  var t_iLength = lingoBinary("div", lingoBinary("add", lingoBinary("mul", 4, 8), 7), meProp(_me, "m_iBitsPerWord"));
  setMeProp(_me, "m_ar_iValue", new LingoList([]));
  callMethod("addAt", meProp(_me, "m_ar_iValue"), t_iLength, 0)
  for (var i = 1; i <= t_iLength; ++i) {
  t_iValue = callNamed("bitAnd", t_iValue, meProp(_me, "m_iBitMask"));
  t_iValue = lingoBinary("div", t_iValue, 2);
  meProp(_me, "m_ar_iValue")[i] = t_iValue;
  }

  setMeProp(_me, "m_iLength", t_iLength);
  while (1) {
  if (lingoBinary("eq", meProp(_me, "m_ar_iValue")[meProp(_me, "m_iLength")], 0)) {
  setMeProp(_me, "m_iLength", lingoBinary("sub", meProp(_me, "m_iLength"), 1));
  continue;
  }

  break;
  }

  break;
case symbol("list"):
  setMeProp(_me, "m_ar_iValue", callMethod("duplicate", a_vInput.m_ar_iValue));
  var m_iValue = a_vInput.m_iValue;
  break;
  }

}

