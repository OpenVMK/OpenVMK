// vmk_junglecruise_minigame.cct / CCollisionEngine / addMapFromPolygon

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addMapFromPolygon(_me: LingoMe, i_ar_points: LingoValue, i_sName: LingoValue) {
  for (var i = 1; i <= lingoBinary("sub", i_ar_points.count, 1); ++i) {
  var p1 = i_ar_points[i];
  var p2 = i_ar_points[lingoBinary("add", i, 1)];
  var x1 = p1.locH;
  var y1 = p1.locV;
  var x2 = p2.locH;
  var y2 = p2.locV;
  var t = callNamed("createObject", symbol("random"), "CCollisionEdge");
  callMethod("Init", t, x1, y1, lingoBinary("sub", x2, x1), lingoBinary("sub", y2, y1))
  if ((lingoTruthy(callNamed("voidp", i_sName)) ? 0 : 1)) {
  var t_sName = lingoBinary("join", lingoBinary("join", i_sName, "_"), i);
  callMethod("SetName", t, t_sName)
  }

  callMethod("add", meProp(_me, "collisionMap"), t)
  }

}

