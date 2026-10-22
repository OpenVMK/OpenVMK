// vmk_monorail_station_handler.cct / CBezierAnimator / new

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _new(_me: LingoMe) {
  setMeProp(_me, "pCurvePoints", new LingoList([]));
  setMeProp(_me, "pMovingOrigo", 0);
  setMeProp(_me, "pOffset", callNamed("point", float(0), float(0)));
  setMeProp(_me, "pLength", float(0));
  setMeProp(_me, "pTilt", float(0));
  setMeProp(_me, "pFrameCount", 48);
  setMeProp(_me, "pMaxSpeed", 100);
  var argV = new LingoList([]);
  var argC = lingoBinary("sub", theProperty("paramCount"), 1);
  for (var i = 2; i <= theProperty("paramCount"); ++i) {
  callMethod("append", argV, callNamed("param", i))
  }

  if (lingoBinary("neq", argC, 0)) {
  setMeProp(_me, "pLength", argV[1]);
  }

  if (lingoBinary("gt", argC, 1)) {
  setMeProp(_me, "pTilt", argV[2]);
  }

  if (lingoBinary("gt", argC, 2)) {
  setMeProp(_me, "pFrameCount", argV[3]);
  }

  if (lingoBinary("gt", argC, 3)) {
  setMeProp(_me, "pMaxSpeed", argV[4]);
  }

  if (lingoBinary("gt", argC, 4)) {
  callNamed("put", lingoBinary("joinPad", "Bezier: Unknow argument", argV[5]))
  }

  callMethod("updateControlPoints", _me)
  return _me;
}

