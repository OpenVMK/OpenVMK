// vmk_jungle_cruise.cct / CCollisionEngine / responseVsCircle

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function responseVsCircle(_me: LingoMe, _o: LingoValue, _b: LingoValue, _f: LingoValue) {
  var d = meProp(_me, "detectedCollisions")[1][3];
  var distance = meProp(_me, "detectedCollisions")[1][1];
  var a = _o;
  var b = meProp(_me, "detectedCollisions")[1][6];
  if (lingoBinary("or", lingoBinary("eq", callMethod("GetType", a), symbol("nobody")), lingoBinary("eq", callMethod("GetType", b), symbol("nobody")))) {
  return;
  }

  var n = callNamed("vector", lingoBinary("sub", a.origin.x, b.origin.x), lingoBinary("sub", a.origin.y, b.origin.y), 0);
  callMethod("normalize", n)
  var a1 = callMethod("dot", a.velocity, n);
  var a2 = callMethod("dot", b.velocity, n);
  var optimisedP = lingoBinary("div", lingoBinary("mul", float(2), lingoBinary("sub", a1, a2)), lingoBinary("add", a.mass, b.mass));
  var v1x = lingoBinary("sub", a.velocity.x, lingoBinary("mul", lingoBinary("mul", optimisedP, b.mass), n.x));
  var v1y = lingoBinary("sub", a.velocity.y, lingoBinary("mul", lingoBinary("mul", optimisedP, b.mass), n.y));
  var v2x = lingoBinary("add", b.velocity.x, lingoBinary("mul", lingoBinary("mul", optimisedP, a.mass), n.x));
  var v2y = lingoBinary("add", b.velocity.y, lingoBinary("mul", lingoBinary("mul", optimisedP, a.mass), n.y));
  callMethod("setVelocity", a, lingoBinary("mul", d, lingoBinary("mul", distance, 0.9)))
  setThePropOf(a.origin, "x", lingoBinary("add", a.origin.x, a.velocity.x));
  setThePropOf(a.origin, "y", lingoBinary("add", a.origin.y, a.velocity.y));
  if (lingoBinary("eq", a.circleType, symbol("moving"))) {
  callMethod("setVelocityN", a, v1x, v1y)
  }

  if (lingoBinary("eq", b.circleType, symbol("moving"))) {
  callMethod("setVelocityN", b, v2x, v2y)
  }

  if ((lingoTruthy(callNamed("voidp", callMethod("getBind", _o))) ? 0 : 1)) {
  callMethod("followBind", _o.bind)
  callMethod("setVelocityN", _o.bind, v1x, v1y)
  }

}

