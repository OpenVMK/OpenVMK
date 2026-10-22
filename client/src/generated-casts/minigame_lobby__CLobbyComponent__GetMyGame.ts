// minigame_lobby.cct / CLobbyComponent / GetMyGame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetMyGame(_me: LingoMe) {
  setMeProp(_me, "m_bDirty", 0);
  var tMyAvatarRef = callMethod("get", callNamed("getObject", symbol("session")), "room_own_avatar");
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_myGameID"))) ? 0 : 1)) {
  var tMyGame = callMethod("getaProp", meProp(_me, "m_mp_games"), meProp(_me, "m_myGameID"));
  if ((lingoTruthy(callNamed("voidp", tMyGame)) ? 0 : 1)) {
  if (lingoBinary("eq", callMethod("GetParameterValue", tMyGame.data, "OwnerRef"), tMyAvatarRef)) {
  return callMethod("getaProp", meProp(_me, "m_mp_games"), meProp(_me, "m_myGameID")).data;
  }

  }

  }

  return undefined;
}

