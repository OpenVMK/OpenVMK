// minigame_lobby.cct / CLobbyComponent / RemoveAvatarFromGame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemoveAvatarFromGame(_me: LingoMe, i_ID: LingoValue, i_iAvatarRef: LingoValue) {
  var tGame = callMethod("getaProp", meProp(_me, "m_mp_games"), i_ID);
  if (callNamed("voidp", tGame)) {
  return callNamed("error", _me, lingoBinary("joinPad", lingoBinary("joinPad", "GameID", i_ID), "not found"), symbol("RemoveAvatarFromGame"));
  }

  callMethod("RemoveParticipant", tGame.data, i_iAvatarRef)
  var tMyAvatarRef = callMethod("get", callNamed("getObject", symbol("session")), "room_own_avatar");
  if (lingoBinary("eq", i_iAvatarRef, tMyAvatarRef)) {
  setMeProp(_me, "m_myGameID", undefined);
  }

  setMeProp(_me, "m_bDirty", 1);
  callMethod("CreateGameListContent", callMethod("getInterface", _me))
  callMethod("CreatePlayerListContent", callMethod("getInterface", _me))
  callMethod("CreateAttributeListContent", callMethod("getInterface", _me))
  callMethod("CreateMyAttributeListContent", callMethod("getInterface", _me))
}

