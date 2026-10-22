// vmk_junglecruise_minigame.cct / CSpline3D / TangentAt

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TangentAt(_me: LingoMe, t: LingoValue) {
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
  return tSample;
}

