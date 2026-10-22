// fda7c1aad86c08c12d1a13ae95116821.cct / CRampClampTransferFunction / get

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _get(_me: LingoMe, a_x: LingoValue) {
  switch (meProp(_me, "m_syFinish")) {
case symbol("early"):
  var tVal = lingoBinary("add", lingoBinary("mul", lingoBinary("mul", lingoBinary("div", lingoBinary("sub", meProp(_me, "m_fRangeMax"), meProp(_me, "m_fRangeMin")), meProp(_me, "m_fN")), meProp(_me, "m_fSlope")), lingoBinary("div", a_x, meProp(_me, "m_fN"))), meProp(_me, "m_fRangeMin"));
  break;
case symbol("late"):
  tVal = lingoBinary("sub", lingoBinary("add", lingoBinary("mul", lingoBinary("mul", lingoBinary("div", lingoBinary("sub", meProp(_me, "m_fRangeMax"), meProp(_me, "m_fRangeMin")), meProp(_me, "m_fN")), meProp(_me, "m_fSlope")), lingoBinary("div", a_x, meProp(_me, "m_fN"))), meProp(_me, "m_fRangeMax")), lingoBinary("mul", meProp(_me, "m_fSlope"), lingoBinary("sub", meProp(_me, "m_fRangeMax"), meProp(_me, "m_fRangeMin"))));
  break;
case symbol("otherwise"):
  return callNamed("error", _me, "Slope invalid type", symbol("get"));
  }

  if (lingoBinary("gt", tVal, callNamed("max", new LingoList([meProp(_me, "m_fRangeMax"), meProp(_me, "m_fRangeMin")])))) {
  tVal = callNamed("max", new LingoList([meProp(_me, "m_fRangeMax"), meProp(_me, "m_fRangeMin")]));
  } else {
  if (lingoBinary("lt", tVal, callNamed("min", new LingoList([meProp(_me, "m_fRangeMax"), meProp(_me, "m_fRangeMin")])))) {
  tVal = callNamed("min", new LingoList([meProp(_me, "m_fRangeMax"), meProp(_me, "m_fRangeMin")]));
  }

  }

  return tVal;
}

