// vmk_furniture_code.cct / CRoomItemSound / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  callNamed("executeMessage", "StopRoomSound")
  var t_ar_check = new LingoList([]);
  callNamed("executeMessage", "countSoundItems", t_ar_check)
  var t_iItemCount = t_ar_check.count;
  if (lingoBinary("gt", t_iItemCount, 1)) {
  callNamed("executeMessage", "StopRoomSound")
  var t_iItemNum = callNamed("random", lingoBinary("sub", t_iItemCount, 1));
  callMethod("PlaySound", t_ar_check[t_iItemNum])
  callMethod("update", t_ar_check[t_iItemNum])
  } else {
  if (lingoBinary("eq", t_iItemCount, 1)) {
  callNamed("executeMessage", "StopRoomSound")
  callNamed("executeMessage", "LoadRoomSound")
  }

  }

  callNamed("unregisterObject", callMethod("getID", _this))
  callNamed("callAncestor", symbol("deconstruct"), _this)
  return 1;
}

