// vmk_junglecruise_minigame.cct / CCollisionEngine / addSplineEdges

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addSplineEdges(_me: LingoMe, splineControlPoints: LingoValue, bReverse: LingoValue) {
  var spline = callNamed("createObject", symbol("random"), "CCatmullRom");
  if (bReverse) {
  for (var i = splineControlPoints.count; i >= 1; --i) {
  var cKnot = splineControlPoints[i];
  callMethod("AddPoint", spline, callNamed("point", cKnot.x, cKnot.y))
  }

  } else {
  for (var cKnot of splineControlPoints.toArray()) {
  callMethod("AddPoint", spline, callNamed("point", cKnot.x, cKnot.y))
  }

  }

  callMethod("eval", spline)
  callMethod("addMapFromPolygon", _me, callMethod("getPolyline", spline))
}

