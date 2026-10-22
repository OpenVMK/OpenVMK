// vmk_tutorial.cct / CCollisionEngine / detectCircleVsEdge

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function detectCircleVsEdge(_me: LingoMe, _o: LingoValue, _edge: LingoValue) {
  var dotp = callMethod("dot", _edge.normal, _o.velocity);
  if (lingoBinary("gte", dotp, float(0))) {
  return 0;
  }

  setThePropOf(_o.circleIntersection, "x", lingoBinary("mul", lingoBinary("mul", -float(float(1)), _edge.normal.x), _o.radius));
  setThePropOf(_o.circleIntersection, "y", lingoBinary("mul", lingoBinary("mul", -float(float(1)), _edge.normal.y), _o.radius));
  var v1x = lingoBinary("add", _o.origin.x, _o.circleIntersection.x);
  var v1y = lingoBinary("add", _o.origin.y, _o.circleIntersection.y);
  var x1 = lingoBinary("mul", v1x, float(1));
  var y1 = lingoBinary("mul", v1y, float(1));
  var x2 = lingoBinary("add", lingoBinary("mul", v1x, float(1)), lingoBinary("mul", _o.velocity.x, float(1)));
  var y2 = lingoBinary("add", lingoBinary("mul", v1y, float(1)), lingoBinary("mul", _o.velocity.y, float(1)));
  var x3 = lingoBinary("mul", _edge.origin.x, float(1));
  var y3 = lingoBinary("mul", _edge.origin.y, float(1));
  var x4 = lingoBinary("add", lingoBinary("mul", _edge.origin.x, float(1)), lingoBinary("mul", _edge.direction.x, float(1)));
  var y4 = lingoBinary("add", lingoBinary("mul", _edge.origin.y, float(1)), lingoBinary("mul", _edge.direction.y, float(1)));
  if ((lingoTruthy(callNamed("lineIntersection", x1, y1, x2, y2, x3, y3, x4, y4, _edge.intersection)) ? 0 : 1)) {
  return 0;
  }

  if (callNamed("pointOnLineSegment", x3, y3, x4, y4, _edge.intersection)) {
  var dx = lingoBinary("sub", _edge.intersection.x, v1x);
  var dy = lingoBinary("sub", _edge.intersection.y, v1y);
  var distance = callNamed("sqrt", lingoBinary("add", lingoBinary("mul", dx, dx), lingoBinary("mul", dy, dy)));
  if (lingoBinary("gt", distance, callMethod("length", _o.velocity))) {
  return 0;
  }

  callMethod("add", meProp(_me, "detectedCollisions"), new LingoList([distance, "edge", _edge, new LingoList([_o.circleIntersection.x, _o.circleIntersection.y]), dx, dy]))
  return 1;
  }

  var check = callNamed("lineCircleIntersection", _edge.intersection, new LingoList([lingoBinary("mul", -float(_o.velocity.x), float(1)), lingoBinary("mul", -float(_o.velocity.y), float(1))]), _o.origin, _o.radius, _o.circleIntersection);
  if ((lingoTruthy(check) ? 0 : 1)) {
  return 0;
  }

  var cx = lingoBinary("add", _o.origin.x, _o.circleIntersection.x);
  var cy = lingoBinary("add", _o.origin.y, _o.circleIntersection.y);
  dx = lingoBinary("sub", _edge.intersection.x, cx);
  dy = lingoBinary("sub", _edge.intersection.y, cy);
  distance = callNamed("sqrt", lingoBinary("add", lingoBinary("mul", dx, dx), lingoBinary("mul", dy, dy)));
  if (lingoBinary("gt", distance, callMethod("length", _o.velocity))) {
  return 0;
  }

  callMethod("add", meProp(_me, "detectedCollisions"), new LingoList([distance, "edge", _edge, new LingoList([_o.circleIntersection.x, _o.circleIntersection.y]), dx, dy]))
  return 1;
}

