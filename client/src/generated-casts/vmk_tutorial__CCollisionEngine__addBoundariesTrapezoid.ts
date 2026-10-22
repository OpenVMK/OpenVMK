// vmk_tutorial.cct / CCollisionEngine / addBoundariesTrapezoid

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addBoundariesTrapezoid(_me: LingoMe) {
  var tW = 300;
  var tH = 300;
  var t = callNamed("createObject", symbol("random"), "CCollisionEdge");
  callMethod("Init", t, lingoBinary("div", -float(tW), 2), lingoBinary("div", -float(tH), 2), tW, 0)
  callMethod("add", meProp(_me, "collisionMap"), t)
  t = callNamed("createObject", symbol("random"), "CCollisionEdge");
  callMethod("Init", t, lingoBinary("div", tW, 2), lingoBinary("div", tH, 2), -float(tW), 0)
  callMethod("add", meProp(_me, "collisionMap"), t)
  t = callNamed("createObject", symbol("random"), "CCollisionEdge");
  callMethod("Init", t, lingoBinary("div", -float(tW), 2), lingoBinary("div", tH, 2), 0, -float(tH))
  callMethod("add", meProp(_me, "collisionMap"), t)
  t = callNamed("createObject", symbol("random"), "CCollisionEdge");
  callMethod("Init", t, lingoBinary("div", tW, 2), lingoBinary("div", -float(tH), 2), 0, tH)
  callMethod("add", meProp(_me, "collisionMap"), t)
}

