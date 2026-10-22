// vmk_tutorial.cct / MathMethods / pointOnLineSegment

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function pointOnLineSegment(_me: LingoMe, x1: LingoValue, y1: LingoValue, x2: LingoValue, y2: LingoValue, _point: LingoValue) {
  var x3 = _point.x;
  var y3 = _point.y;
  if (lingoBinary("neq", lingoBinary("sub", x2, x1), 0)) {
  var u = lingoBinary("div", lingoBinary("sub", x3, x1), lingoBinary("sub", x2, x1));
  } else {
  if (lingoBinary("neq", lingoBinary("sub", y2, y1), 0)) {
  u = lingoBinary("div", lingoBinary("sub", y3, y1), lingoBinary("sub", y2, y1));
  }

  }

  if (lingoBinary("lt", u, 0)) {
  setThePropOf(_point, "x", x1);
  setThePropOf(_point, "y", y1);
  return 0;
  } else {
  if (lingoBinary("gt", u, 1)) {
  setThePropOf(_point, "x", x2);
  setThePropOf(_point, "y", y2);
  return 0;
  } else {
  setThePropOf(_point, "x", x3);
  setThePropOf(_point, "y", y3);
  return 1;
  }

  }

}

