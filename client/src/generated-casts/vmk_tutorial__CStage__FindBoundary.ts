// vmk_tutorial.cct / CStage / FindBoundary

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function FindBoundary(_me: LingoMe, a_rSpline: LingoValue, a_normalSide: LingoValue) {
  var o_ar_boundary = new LingoList([]);
  var tDelta = lingoBinary("div", lingoBinary("sub", callNamed("float", lingoBinary("sub", callMethod("getNumControlPoints", a_rSpline), 3)), 0.001), meProp(_me, "m_iBoundaryAccuracy"));
  for (var i = 1; i <= meProp(_me, "m_iBoundaryAccuracy"); ++i) {
  o_ar_boundary[i] = new LingoPropList([symbol("pos"), callMethod("InterpolateAt", a_rSpline, lingoBinary("mul", i, tDelta)), symbol("normal"), callMethod("NormalAt", a_rSpline, lingoBinary("mul", i, tDelta), a_normalSide, symbol("xy")), symbol("tangent"), callMethod("TangentAt", a_rSpline, lingoBinary("mul", i, tDelta))]);
  }

  return o_ar_boundary;
}

