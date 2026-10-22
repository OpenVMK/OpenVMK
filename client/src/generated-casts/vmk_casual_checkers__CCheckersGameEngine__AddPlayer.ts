// vmk_casual_checkers.cct / CCheckersGameEngine / AddPlayer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AddPlayer(_me: LingoMe, _this: LingoValue, a_iAvatarRef: LingoValue, a_rMsg: LingoValue) {
  var t_iLevel = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iIndex = lingoBinary("add", callMethod("GetIntFrom", a_rMsg.connection), 1);
  var t_rAvatar = callMethod("_AccessIndexed", meProp(_me, "m_rRoomContext"), a_iAvatarRef, "avatar");
  var t_iPoints = 0;
  callMethod("setaProp", meProp(_me, "m_rPlayers"), a_iAvatarRef, new LingoPropList([symbol("index"), t_iIndex, symbol("name"), callMethod("GetParam", t_rAvatar, "NAME"), symbol("points"), t_iPoints, symbol("level"), t_iLevel, symbol("tricks"), 0]))
  callNamed("put", callMethod("getaProp", meProp(_me, "m_rPlayers"), a_iAvatarRef))
  if (lingoBinary("eq", callMethod("GetParam", t_rAvatar, "NAME"), callMethod("get", callNamed("getObject", symbol("session")), "name"))) {
  setMeProp(_me, "m_iOwnPlayer", t_iIndex);
  }

  if (callNamed("objectp", meProp(_me, "m_rInterface"))) {
  callMethod("AddPlayer", meProp(_me, "m_rInterface"), a_iAvatarRef, callMethod("GetParam", t_rAvatar, "NAME"), t_iIndex)
  }

  callMethod("UpdatePoints", _this, a_iAvatarRef, t_iPoints)
}

