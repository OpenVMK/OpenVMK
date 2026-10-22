// vmk_jungle_cruise.cct / CCollisionEngine / Detect

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Detect(_me: LingoMe, objectlist: LingoValue, _o: LingoValue) {
  setMeProp(_me, "detectedCollisions", new LingoList([]));
  if (lingoBinary("neq", callMethod("getOne", _o.collisionModifiers, symbol("circle")), 0)) {
  for (var i = 1; i <= callNamed("count", objectlist); ++i) {
  if (lingoBinary("eq", objectlist[i], _o)) {
  continue;
  }

  if (callMethod("detectCircleVsCircle", _me, _o, objectlist[i])) {
  setThePropOf(objectlist[i], "IVEBEENHIT", 1);
  callMethod("collisionNotification", _o, symbol("circle"), 1, objectlist[i])
  callMethod("collisionNotification", objectlist[i], symbol("circle"), 0, _o)
  continue;
  }

  }

  }

  for (var i = 1; i <= callNamed("count", meProp(_me, "collisionMap")); ++i) {
  setThePropOf(meProp(_me, "collisionMap")[i], "Active", 0);
  if (callMethod("detectCircleVsEdge", _me, _o, meProp(_me, "collisionMap")[i])) {
  callMethod("collisionNotification", _o, symbol("edge"), 1, meProp(_me, "collisionMap")[i])
  continue;
  }

  }

  if (lingoBinary("gt", callNamed("count", meProp(_me, "detectedCollisions")), 0)) {
  return 1;
  } else {
  return 0;
  }

}

