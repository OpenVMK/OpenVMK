// vmk_tent_handler.cct / CSpline3D / InterpolateAt

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function InterpolateAt(_me: LingoMe, t: LingoValue) {
  if (callMethod("IsOutOfBounds", _me, t)) {
  callNamed("error", _me, lingoBinary("joinPad", t, "Is out of spline bounds"), symbol("InterpolateAt"))
  return undefined;
  }

  if (lingoBinary("lt", meProp(_me, "m_ar_controlPoints").count, 4)) {
  callNamed("error", _me, lingoBinary("joinPad", meProp(_me, "m_ar_controlPoints").count, "is not enough points for interpolation, at least 4 are needed!"), symbol("InterpolateAt"))
  return undefined;
  }

  var startKnot = lingoBinary("add", callNamed("integer", callNamed("floor", t)), 1);
  var fraction = lingoBinary("sub", t, callNamed("floor", t));
  var p1 = meProp(_me, "m_ar_controlPoints")[startKnot];
  var p2 = meProp(_me, "m_ar_controlPoints")[lingoBinary("add", startKnot, 1)];
  var p3 = meProp(_me, "m_ar_controlPoints")[lingoBinary("add", startKnot, 2)];
  var p4 = meProp(_me, "m_ar_controlPoints")[lingoBinary("add", startKnot, 3)];
  switch (meProp(_me, "m_iMode")) {
case symbol("CatmullRom"):
  return callNamed("interpolateCatmullRom", fraction, p1, p2, p3, p4);
case symbol("CubicBezier"):
  return callNamed("interpolateCubicBezier", fraction, p1, p2, p3, p4);
  }

}

