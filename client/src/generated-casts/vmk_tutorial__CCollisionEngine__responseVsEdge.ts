// vmk_tutorial.cct / CCollisionEngine / responseVsEdge

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function responseVsEdge(_me: LingoMe, _o: LingoValue, _b: LingoValue, _f: LingoValue) {
  var distance = meProp(_me, "detectedCollisions")[1][1];
  var edge = meProp(_me, "detectedCollisions")[1][3];
  setThePropOf(edge, "Active", 1);
  var _circleIntersection = meProp(_me, "detectedCollisions")[1][4];
  var dx = meProp(_me, "detectedCollisions")[1][5];
  var dy = meProp(_me, "detectedCollisions")[1][6];
  var dot = callMethod("dot", edge.normal, _o.velocity);
  var nx = lingoBinary("mul", edge.normal.x, dot);
  var ny = lingoBinary("mul", edge.normal.y, dot);
  var tX = lingoBinary("sub", _o.velocity.x, nx);
  var tY = lingoBinary("sub", _o.velocity.y, ny);
  _b = callNamed("max", 0.05, callNamed("min", 0.98, _b));
  if (lingoBinary("lt", dot, 0)) {
  var fx = lingoBinary("mul", tX, _f);
  var fy = lingoBinary("mul", tY, _f);
  var bx = lingoBinary("mul", nx, lingoBinary("add", 1, _b));
  var by = lingoBinary("mul", ny, lingoBinary("add", 1, _b));
  } else {
  bx = 0;
  by = 0;
  fx = 0;
  fy = 0;
  }

  var finalx = lingoBinary("sub", _o.velocity.x, lingoBinary("add", fx, bx));
  var finaly = lingoBinary("sub", _o.velocity.y, lingoBinary("add", fy, by));
  setThePropOf(_o.origin, "x", lingoBinary("add", _o.origin.x, dx));
  setThePropOf(_o.origin, "y", lingoBinary("add", _o.origin.y, dy));
  callMethod("setVelocityN", _o, finalx, finaly)
  if ((lingoTruthy(callNamed("voidp", callMethod("getBind", _o))) ? 0 : 1)) {
  callMethod("followBind", _o.bind)
  callMethod("setVelocityN", _o.bind, finalx, finaly)
  }

}

