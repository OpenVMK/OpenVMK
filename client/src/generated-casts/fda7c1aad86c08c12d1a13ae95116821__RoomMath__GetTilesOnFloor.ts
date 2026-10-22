// fda7c1aad86c08c12d1a13ae95116821.cct / RoomMath / GetTilesOnFloor

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetTilesOnFloor(_me: LingoMe, t_sFloorName: LingoValue) {
  var t_ar_tiles = new LingoPropList([]);
  if (callNamed("voidp", t_sFloorName)) {
  return t_ar_tiles;
  }

  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room")));
  if (callNamed("objectp", tRoomContext)) {
  var t_mp_sElements = tRoomContext.m_mp_sCls_mp_iRef_sKey["floor"];
  if (callNamed("voidp", t_mp_sElements)) {
  return t_ar_tiles;
  }

  for (var tID of t_mp_sElements.toArray()) {
  var t_rFloor = tRoomContext.m_rChilds[tID];
  var t_sName = callMethod("GetParam", t_rFloor, "NAME");
  if (lingoBinary("eq", t_sName, t_sFloorName)) {
  return t_rFloor.m_rChilds;
  }

  }

  }

  return t_ar_tiles;
}

