// vmk_tutorial.cct / MathMethods / lineCircleIntersection

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function lineCircleIntersection(_me: LingoMe, rO: LingoValue, rV: LingoValue, sO: LingoValue, sr: LingoValue, _dest: LingoValue) {
  var x1 = lingoBinary("mul", float(1), lingoBinary("sub", rO.x, sO.x));
  var y1 = lingoBinary("mul", float(1), lingoBinary("sub", rO.y, sO.y));
  var x2 = lingoBinary("mul", float(1), lingoBinary("sub", lingoBinary("add", rO.x, rV[1]), sO.x));
  var y2 = lingoBinary("mul", float(1), lingoBinary("sub", lingoBinary("add", rO.y, rV[2]), sO.y));
  var r = sr;
  var x0 = sO;
  var y0 = sO;
  var a = lingoBinary("add", lingoBinary("mul", lingoBinary("sub", x2, x1), lingoBinary("sub", x2, x1)), lingoBinary("mul", lingoBinary("sub", y2, y1), lingoBinary("sub", y2, y1)));
  var b = lingoBinary("add", lingoBinary("mul", lingoBinary("mul", 2, x1), lingoBinary("sub", x2, x1)), lingoBinary("mul", lingoBinary("mul", 2, y1), lingoBinary("sub", y2, y1)));
  var c = lingoBinary("sub", lingoBinary("add", lingoBinary("mul", x1, x1), lingoBinary("mul", y1, y1)), lingoBinary("mul", r, r));
  if (lingoBinary("eq", a, 0)) {
  setThePropOf(_dest, "x", 0);
  setThePropOf(_dest, "y", 0);
  return 0;
  }

  var decriminator = lingoBinary("sub", lingoBinary("mul", b, b), lingoBinary("mul", lingoBinary("mul", 4, a), c));
  if (lingoBinary("lt", decriminator, 0)) {
  setThePropOf(_dest, "x", 0);
  setThePropOf(_dest, "y", 0);
  return 0;
  } else {
  if (lingoBinary("eq", decriminator, 0)) {
  var u = lingoBinary("div", lingoBinary("mul", -float(1), b), lingoBinary("mul", 2, a));
  x0 = lingoBinary("add", x1, lingoBinary("mul", u, lingoBinary("sub", x2, x1)));
  y0 = lingoBinary("add", y1, lingoBinary("mul", u, lingoBinary("sub", y2, y1)));
  setThePropOf(_dest, "x", x0);
  setThePropOf(_dest, "y", y0);
  return 1;
  } else {
  var u1 = lingoBinary("div", -float(lingoBinary("add", b, callNamed("sqrt", decriminator))), lingoBinary("mul", 2, a));
  var u2 = lingoBinary("div", -float(lingoBinary("sub", b, callNamed("sqrt", decriminator))), lingoBinary("mul", 2, a));
  var s1x = lingoBinary("add", x1, lingoBinary("mul", u1, lingoBinary("sub", x2, x1)));
  var s1y = lingoBinary("add", y1, lingoBinary("mul", u1, lingoBinary("sub", y2, y1)));
  var s2x = lingoBinary("add", x1, lingoBinary("mul", u2, lingoBinary("sub", x2, x1)));
  var s2y = lingoBinary("add", y1, lingoBinary("mul", u2, lingoBinary("sub", y2, y1)));
  var d1x = lingoBinary("sub", lingoBinary("sub", rO.x, s1x), sO.x);
  var d1y = lingoBinary("sub", lingoBinary("sub", rO.y, s1y), sO.y);
  var d1 = lingoBinary("add", lingoBinary("mul", d1x, d1x), lingoBinary("mul", d1y, d1y));
  var d2x = lingoBinary("sub", lingoBinary("sub", rO.x, s2x), sO.x);
  var d2y = lingoBinary("sub", lingoBinary("sub", rO.y, s2y), sO.y);
  var d2 = lingoBinary("add", lingoBinary("mul", d2x, d2x), lingoBinary("mul", d2y, d2y));
  if (lingoBinary("lt", d1, d2)) {
  setThePropOf(_dest, "x", s1x);
  setThePropOf(_dest, "y", s1y);
  return 1;
  } else {
  setThePropOf(_dest, "x", s2x);
  setThePropOf(_dest, "y", s2y);
  }

  }

  }

  return 0;
}

