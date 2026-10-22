// vmk_jungle_cruise.cct / CCollisionEngine / Response

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Response(_me: LingoMe, _o: LingoValue, _b: LingoValue, _f: LingoValue) {
  callMethod("sort", meProp(_me, "detectedCollisions"))
  if (_o.animating) {
  if (lingoBinary("gt", callNamed("count", meProp(_me, "detectedCollisions")), 0)) {
  var collisionType = meProp(_me, "detectedCollisions")[1][2];
  if (lingoBinary("eq", collisionType, "circle")) {
  callMethod("responseVsCircle", _me, _o, _b, _f)
  } else {
  if (lingoBinary("eq", collisionType, "edge")) {
  callMethod("responseVsEdge", _me, _o, _b, _f)
  } else {
  callNamed("put", "Alert: Unknown Collision-type")
  }

  }

  } else {
  setThePropOf(_o.origin, "x", lingoBinary("add", _o.origin.x, _o.velocity.x));
  setThePropOf(_o.origin, "y", lingoBinary("add", _o.origin.y, _o.velocity.y));
  }

  }

}

