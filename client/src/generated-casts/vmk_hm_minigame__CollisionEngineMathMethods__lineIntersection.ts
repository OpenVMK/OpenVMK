// vmk_hm_minigame.cct / CollisionEngineMathMethods / lineIntersection

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function lineIntersection(_me: LingoMe, x1: LingoValue, y1: LingoValue, x2: LingoValue, y2: LingoValue, x3: LingoValue, y3: LingoValue, x4: LingoValue, y4: LingoValue, _vec: LingoValue) {
  var x0 = 0;
  var y0 = 0;
  if (lingoBinary("and", lingoBinary("eq", lingoBinary("sub", x2, x1), 0), lingoBinary("eq", lingoBinary("sub", x4, x3), 0))) {
  setThePropOf(_vec, "x", x0);
  setThePropOf(_vec, "y", y0);
  return 0;
  }

  if (lingoBinary("eq", lingoBinary("sub", x2, x1), 0)) {
  x0 = x1;
  var u = lingoBinary("div", lingoBinary("sub", x0, x3), lingoBinary("sub", x4, x3));
  y0 = lingoBinary("add", y3, lingoBinary("mul", u, lingoBinary("sub", y4, y3)));
  } else {
  if (lingoBinary("eq", lingoBinary("sub", x4, x3), 0)) {
  x0 = x3;
  u = lingoBinary("div", lingoBinary("sub", x0, x1), lingoBinary("sub", x2, x1));
  y0 = lingoBinary("add", y1, lingoBinary("mul", u, lingoBinary("sub", y2, y1)));
  } else {
  var k1 = lingoBinary("div", lingoBinary("sub", y2, y1), lingoBinary("sub", x2, x1));
  var k2 = lingoBinary("div", lingoBinary("sub", y4, y3), lingoBinary("sub", x4, x3));
  if (lingoBinary("neq", lingoBinary("sub", k1, k2), 0)) {
  x0 = lingoBinary("div", lingoBinary("add", lingoBinary("sub", lingoBinary("sub", lingoBinary("mul", k1, x1), y1), lingoBinary("mul", k2, x3)), y3), lingoBinary("sub", k1, k2));
  y0 = lingoBinary("add", lingoBinary("mul", k1, lingoBinary("sub", x0, x1)), y1);
  } else {
  }

  }

  }

  setThePropOf(_vec, "x", x0);
  setThePropOf(_vec, "y", y0);
  return 1;
}

