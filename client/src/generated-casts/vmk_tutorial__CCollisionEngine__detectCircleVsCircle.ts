// vmk_tutorial.cct / CCollisionEngine / detectCircleVsCircle

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function detectCircleVsCircle(_me: LingoMe, a: LingoValue, b: LingoValue) {
  var dist = callMethod("distanceTo", a.origin, b.origin);
  var sumRadii = lingoBinary("add", a.radius, b.radius);
  dist = lingoBinary("sub", dist, sumRadii);
  if (lingoBinary("lt", callMethod("length", a.velocity), dist)) {
  return 0;
  }

  var n = callMethod("duplicate", a.velocity);
  callMethod("normalize", n)
  var c = lingoBinary("sub", callMethod("duplicate", b.origin), a.origin);
  var d = callMethod("dot", n, c);
  if (lingoBinary("lte", d, 0)) {
  return 0;
  }

  var lenC = callMethod("length", c);
  var f = lingoBinary("sub", lingoBinary("mul", lenC, lenC), lingoBinary("mul", d, d));
  var sumRadiiSquared = lingoBinary("mul", sumRadii, sumRadii);
  if (lingoBinary("gte", f, sumRadiiSquared)) {
  return 0;
  }

  var t = lingoBinary("sub", sumRadiiSquared, f);
  if (lingoBinary("lt", t, 0)) {
  return 0;
  }

  var distance = lingoBinary("sub", d, callNamed("sqrt", t));
  var mag = callMethod("length", a.velocity);
  if (lingoBinary("lt", mag, distance)) {
  return 0;
  }

  callMethod("add", meProp(_me, "detectedCollisions"), new LingoList([distance, "circle", n, lingoBinary("div", distance, mag), dist, b]))
  return 1;
}

