// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / CRoomItemProximityConfig / GetSurroundingBlocks

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetSurroundingBlocks(_me: LingoMe, t_ar_directions: LingoValue) {
  var a_rContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room")));
  var t_iTileSize = callNamed("value", callMethod("GetParam", a_rContext, "TILESIZE"));
  var t_vObjectOffset = callMethod("GetAbsPos", callMethod("getObject", _me));
  var t_ar_vLocations = new LingoList([]);
  for (var t_rBlk of callMethod("GetBlocks", callMethod("GetFactor", callMethod("getObject", _me))).toArray()) {
  var t_rBlkPos = callMethod("GetAbsPos", t_rBlk);
  for (var i = 1; i <= meProp(_me, "m_ar_configuration").count; ++i) {
  var t_iAmount = meProp(_me, "m_ar_configuration")[i];
  if (lingoBinary("gt", t_iAmount, 0)) {
  for (var j = 1; j <= t_iAmount; ++j) {
  var t_iDir = lingoBinary("mul", t_ar_directions[i], j);
  var t_vNewLoc = lingoBinary("sub", lingoBinary("add", t_rBlkPos, lingoBinary("mul", t_iTileSize, t_iDir)), t_vObjectOffset);
  var t_scrPos = callNamed("AbsToScr", t_vNewLoc);
  if (lingoBinary("eq", callMethod("getOne", t_ar_vLocations, t_scrPos), 0)) {
  callMethod("append", t_ar_vLocations, t_scrPos)
  }

  }

  }

  }

  }

  return t_ar_vLocations;
}

