// minigame_lobby.cct / CLobbyComponent / KickAvatarFromGame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function KickAvatarFromGame(_me: LingoMe, i_ID: LingoValue, i_iAvatarRef: LingoValue) {
  callMethod("RemoveAvatarFromGame", _me, i_ID, i_iAvatarRef)
  var tMyAvatarRef = callMethod("get", callNamed("getObject", symbol("session")), "room_own_avatar");
  if (lingoBinary("eq", i_iAvatarRef, tMyAvatarRef)) {
  callNamed("executeMessage", symbol("Kicked_From_Game"))
  }

}

