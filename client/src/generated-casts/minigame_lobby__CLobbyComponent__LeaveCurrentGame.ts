// minigame_lobby.cct / CLobbyComponent / LeaveCurrentGame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LeaveCurrentGame(_me: LingoMe) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_myGameID"))) ? 0 : 1)) {
  var t_rMyGame = callMethod("getaProp", meProp(_me, "m_mp_games"), meProp(_me, "m_myGameID"));
  if (callNamed("objectp", t_rMyGame)) {
  var tMyAvatarRef = callMethod("get", callNamed("getObject", symbol("session")), "room_own_avatar");
  if (lingoBinary("eq", callMethod("GetParameterValue", callMethod("getaProp", meProp(_me, "m_mp_games"), meProp(_me, "m_myGameID")).data, "OwnerRef"), tMyAvatarRef)) {
  callMethod("RemoveMyGame", _me)
  } else {
  callMethod("SendLeaveGame", callMethod("getHandler", _me), meProp(_me, "m_myGameID"))
  setMeProp(_me, "m_myGameID", undefined);
  }

  }

  }

}

