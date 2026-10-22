// vmk_hm_minigame.cct / CCollisionEngine / createCollisionmap

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createCollisionmap(_me: LingoMe, t_rContext: LingoValue) {
  var t_ar_floors = new LingoPropList([]);
  callMethod("sort", t_ar_floors)
  var t_rIterator = callMethod("GetIterator", t_rContext, "floor");
  if (callMethod("FirstToken", t_rIterator)) {
  while (1) {
  var t_rFloor = callMethod("getToken", t_rIterator);
  if ((lingoTruthy(callNamed("objectp", t_rFloor)) ? 0 : 1)) {
  break;
  }

  var t_sFloorName = callMethod("GetParam", t_rFloor, "NAME");
  var t_x = callNamed("float", callMethod("GetParam", t_rFloor, "X"));
  var t_y = callNamed("float", callMethod("GetParam", t_rFloor, "Y"));
  var t_z = callNamed("float", callMethod("GetParam", t_rFloor, "Z"));
  var t_floorPos = callNamed("vector", t_x, t_y, t_z);
  var t_ar_tiles = new LingoList([]);
  var t_ar_tileRef = new LingoList([]);
  for (var i = 1; i <= callMethod("GetCount", t_rFloor); ++i) {
  var tNode = t_rFloor[i];
  var t_sClass = callMethod("GetParam", tNode, "CLASS");
  var t_sX = callMethod("GetParam", tNode, "X");
  var t_sY = callMethod("GetParam", tNode, "Y");
  var t_sZ = callMethod("GetParam", tNode, "Z");
  var t_vPos = callNamed("vector", callNamed("float", t_sX), callNamed("float", t_sY), callNamed("float", t_sZ));
  callMethod("append", t_ar_tiles, t_vPos)
  callMethod("append", t_ar_tileRef, callMethod("GetParam", tNode, "REF"))
  }

  t_ar_floors[t_sFloorName] = new LingoList([t_floorPos, t_ar_tiles, t_ar_tileRef]);
  if ((lingoTruthy(callMethod("NextToken", t_rIterator)) ? 0 : 1)) {
  break;
  }

  }

  }

  return t_ar_floors;
}

