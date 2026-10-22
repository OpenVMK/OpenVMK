// 38365562899c7799eeaea4a99041ea57.cct / QuestNotificationsAPI / GetOwnAvatarTile

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetOwnAvatarTile(_me: LingoMe) {
  var t_rObj = callMethod("_AccessIndexed", callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room"))), callMethod("get", callNamed("getObject", symbol("session")), "room_own_avatar"), "avatar");
  if (callNamed("objectp", t_rObj)) {
  var t_rAvatarTile = callMethod("GetFactor", t_rObj).m_rTarget;
  if (callNamed("voidp", t_rAvatarTile)) {
  t_rAvatarTile = callMethod("GetFactor", t_rObj).m_rOldTarget;
  }

  if (callNamed("voidp", t_rAvatarTile)) {
  t_rAvatarTile = callNamed("GetTileAtPos", callMethod("GetAbsPos", t_rObj));
  }

  return t_rAvatarTile;
  }

  return undefined;
}

