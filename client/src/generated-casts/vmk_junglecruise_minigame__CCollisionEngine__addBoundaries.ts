// vmk_junglecruise_minigame.cct / CCollisionEngine / addBoundaries

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addBoundaries(_me: LingoMe) {
  var tW = callNamed("getVariableValue", "junglecruise.collisionboundaries.box.width");
  if (callNamed("voidp", tW)) {
  tW = 800;
  }

  var tH = callNamed("getVariableValue", "junglecruise.collisionboundaries.box.height");
  if (callNamed("voidp", tH)) {
  tH = 600;
  }

  var x1 = lingoBinary("div", lingoBinary("sub", 800, tW), 2);
  var y1 = lingoBinary("div", lingoBinary("sub", 600, tH), 2);
  tW = lingoBinary("add", tW, 30);
  var tPoints = new LingoList([]);
  callMethod("append", tPoints, callNamed("point", x1, y1))
  callMethod("append", tPoints, callNamed("point", lingoBinary("add", x1, tW), y1))
  callMethod("append", tPoints, callNamed("point", lingoBinary("add", x1, tW), lingoBinary("add", y1, tH)))
  callMethod("append", tPoints, callNamed("point", x1, lingoBinary("add", y1, tH)))
  callMethod("append", tPoints, callNamed("point", x1, y1))
  var t_ar_World = new LingoList([]);
  for (var i = 1; i <= tPoints.count; ++i) {
  var tpoint = callNamed("InverseAxonometricPosition", tPoints[i]);
  callMethod("append", t_ar_World, tpoint)
  }

  callMethod("addMapFromPolygon", _me, t_ar_World, "boundary")
}

