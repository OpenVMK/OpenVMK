// vmk_hm_minigame.cct / CCollisionEngine / links2positions

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function links2positions(_me: LingoMe, t_rContext: LingoValue, i_ar_links: LingoValue) {
  var t_ar_links = new LingoList([]);
  for (var t_ar_refs of i_ar_links.toArray()) {
  var t_ar_Link = new LingoList([]);
  for (var i = 1; i <= t_ar_refs.count; ++i) {
  var t_iRef = callNamed("integer", t_ar_refs[i]);
  var t_rTile = callMethod("_AccessIndexed", t_rContext, t_iRef, "tile");
  var t_vPos = callNamed("vector", 0, 0, 0);
  var t_floorPos = callNamed("vector", 0, 0, 0);
  if ((lingoTruthy(callNamed("voidp", t_rTile)) ? 0 : 1)) {
  var t_rFloor = callMethod("GetOwner", t_rTile);
  if ((lingoTruthy(callNamed("voidp", t_rFloor)) ? 0 : 1)) {
  var t_x = callNamed("float", callMethod("GetParam", t_rFloor, "X"));
  var t_y = callNamed("float", callMethod("GetParam", t_rFloor, "Y"));
  var t_z = callNamed("float", callMethod("GetParam", t_rFloor, "Z"));
  t_floorPos = callNamed("vector", t_x, t_y, t_z);
  }

  var t_sX = callMethod("GetParam", t_rTile, "X");
  var t_sY = callMethod("GetParam", t_rTile, "Y");
  var t_sZ = callMethod("GetParam", t_rTile, "Z");
  t_vPos = callNamed("vector", callNamed("float", t_sX), callNamed("float", t_sY), callNamed("float", t_sZ));
  }

  callMethod("append", t_ar_Link, lingoBinary("add", t_vPos, t_floorPos))
  }

  callMethod("append", t_ar_links, t_ar_Link)
  }

  var t_ar_sDirections = new LingoList(["N", "NE", "E", "SE", "S", "SW", "W", "NW"]);
  var t_ar_final = new LingoList([]);
  t_ar_final[1] = new LingoList([]);
  t_ar_final[2] = new LingoList([]);
  t_ar_final[3] = new LingoList([]);
  t_ar_final[4] = new LingoList([]);
  t_ar_final[5] = new LingoList([]);
  t_ar_final[6] = new LingoList([]);
  t_ar_final[7] = new LingoList([]);
  t_ar_final[8] = new LingoList([]);
  var t_vOrigo = callNamed("vector", 0, 0, 1);
  callMethod("normalize", t_vOrigo)
  for (var t_ar_Link of t_ar_links.toArray()) {
  var v1 = callMethod("duplicate", t_ar_Link[1]);
  var v2 = callMethod("duplicate", t_ar_Link[2]);
  var v3 = lingoBinary("sub", v2, v1);
  setThePropOf(v3, "z", 0);
  callMethod("normalize", v3)
  var a = callNamed("DirectionFromVector", v3);
  var d = lingoBinary("add", lingoBinary("div", callNamed("integer", lingoBinary("add", a, 22)), 45), 1);
  switch (d) {
case 0:
case 8:
  callMethod("append", t_ar_final[1], new LingoList([v1, v2]))
  callMethod("append", t_ar_final[5], new LingoList([v2, v1]))
  break;
case 1:
  callMethod("append", t_ar_final[2], new LingoList([v1, v2]))
  callMethod("append", t_ar_final[6], new LingoList([v2, v1]))
  break;
case 2:
  callMethod("append", t_ar_final[3], new LingoList([v1, v2]))
  callMethod("append", t_ar_final[7], new LingoList([v2, v1]))
  break;
case 3:
  callMethod("append", t_ar_final[4], new LingoList([v1, v2]))
  callMethod("append", t_ar_final[8], new LingoList([v2, v1]))
  break;
case 4:
  callMethod("append", t_ar_final[5], new LingoList([v1, v2]))
  callMethod("append", t_ar_final[1], new LingoList([v2, v1]))
  break;
case 5:
  callMethod("append", t_ar_final[6], new LingoList([v1, v2]))
  callMethod("append", t_ar_final[2], new LingoList([v2, v1]))
  break;
case 6:
  callMethod("append", t_ar_final[7], new LingoList([v1, v2]))
  callMethod("append", t_ar_final[3], new LingoList([v2, v1]))
  break;
case 7:
  callMethod("append", t_ar_final[8], new LingoList([v1, v2]))
  callMethod("append", t_ar_final[4], new LingoList([v2, v1]))
  break;
  default:
  callMethod("append", t_ar_final[1], new LingoList([v1, v2]))
  callMethod("append", t_ar_final[5], new LingoList([v2, v1]))
  break;
  }

  }

  var t_count = 0;
  for (var t of t_ar_final.toArray()) {
  t_count = lingoBinary("add", t_count, t.count);
  }

  callNamed("put", lingoBinary("joinPad", t_ar_links.count, t_count))
  return t_ar_final;
}

