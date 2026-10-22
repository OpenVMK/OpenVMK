// fda7c1aad86c08c12d1a13ae95116821.cct / RoomMath / GetAvatarsOnTiles

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetAvatarsOnTiles(_me: LingoMe, a_ar_tiles: LingoValue) {
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room")));
  var t_ar_foundAvatars = new LingoList([]);
  if (callNamed("objectp", tRoomContext)) {
  var t_mp_sElements = tRoomContext.m_mp_sCls_mp_iRef_sKey["avatar"];
  if (callNamed("voidp", t_mp_sElements)) {
  return t_ar_foundAvatars;
  }

  for (var tID of t_mp_sElements.toArray()) {
  var t_rAvatar = tRoomContext.m_rChilds[tID];
  if (lingoBinary("neq", callMethod("GetParam", t_rAvatar, "CLASS"), "avatar")) {
  callNamed("put", "ABORT! INVALID AVATAR!")
  return t_ar_foundAvatars;
  }

  var t_rAvatarTile = callMethod("GetFactor", t_rAvatar).m_rTarget;
  if (callNamed("voidp", t_rAvatarTile)) {
  t_rAvatarTile = callMethod("GetFactor", t_rAvatar).m_rOldTarget;
  }

  if (callNamed("voidp", t_rAvatarTile)) {
  t_rAvatarTile = callNamed("GetTileAtPos", callMethod("GetAbsPos", t_rAvatar));
  }

  if (callNamed("listp", a_ar_tiles)) {
  for (var t_rTile of a_ar_tiles.toArray()) {
  if (lingoBinary("eq", t_rAvatarTile, t_rTile)) {
  callMethod("append", t_ar_foundAvatars, t_rAvatar)
  }

  }

  }

  }

  }

  return t_ar_foundAvatars;
}

