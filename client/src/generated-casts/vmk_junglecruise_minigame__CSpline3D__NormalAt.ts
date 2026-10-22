// vmk_junglecruise_minigame.cct / CSpline3D / NormalAt

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function NormalAt(_me: LingoMe, t: LingoValue, a_side: LingoValue, a_plane: LingoValue) {
  if (callMethod("IsOutOfBounds", _me, t)) {
  callNamed("error", _me, lingoBinary("joinPad", t, "Is out of spline bounds"), symbol("InterpolateAt"))
  return undefined;
  }

  if (lingoBinary("lt", meProp(_me, "m_ar_controlPoints").count, 4)) {
  callNamed("error", _me, lingoBinary("joinPad", meProp(_me, "m_ar_controlPoints").count, "is not enough points for interpolation, at least 4 are needed!"), symbol("InterpolateAt"))
  return undefined;
  }

  var tSampleSize = lingoBinary("div", 0.04, meProp(_me, "m_ar_controlPoints").count);
  var tP1 = callMethod("InterpolateAt", _me, t);
  var tP2 = callMethod("InterpolateAt", _me, lingoBinary("add", t, tSampleSize));
  if (callNamed("voidp", tP2)) {
  var tTemp = tP1;
  tP1 = callMethod("InterpolateAt", _me, lingoBinary("sub", t, tSampleSize));
  tP2 = tTemp;
  }

  var tSample = lingoBinary("sub", tP2, tP1);
  callMethod("normalize", tSample)
  switch (a_plane) {
case symbol("xy"):
  if (lingoBinary("eq", a_side, symbol("left"))) {
  return callNamed("vector", tSample.y, tSample.x, tSample.z);
  } else {
  if (lingoBinary("eq", a_side, symbol("right"))) {
  return callNamed("vector", -float(tSample.y), -float(tSample.x), tSample.z);
  }

  }

  break;
case symbol("xz"):
  if (lingoBinary("eq", a_side, symbol("left"))) {
  return callNamed("vector", -float(tSample.z), tSample.y, tSample.x);
  } else {
  if (lingoBinary("eq", a_side, symbol("right"))) {
  return callNamed("vector", tSample.z, tSample.y, -float(tSample.x));
  }

  }

  break;
case symbol("yz"):
  if (lingoBinary("eq", a_side, symbol("left"))) {
  return callNamed("vector", tSample.x, tSample.z, -float(tSample.y));
  } else {
  if (lingoBinary("eq", a_side, symbol("right"))) {
  return callNamed("vector", tSample.x, -float(tSample.z), tSample.y);
  }

  }

  break;
  default:
  callNamed("error", _me, "Normal plane not specified.", symbol("NormalAt"))
  }

  return undefined;
}

