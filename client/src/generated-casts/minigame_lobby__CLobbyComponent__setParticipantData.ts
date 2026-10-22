// minigame_lobby.cct / CLobbyComponent / setParticipantData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setParticipantData(_me: LingoMe, i_ID: LingoValue, i_iAvatarRef: LingoValue, i_iTeam: LingoValue, i_ar_data: LingoValue) {
  var tGame = callMethod("getaProp", meProp(_me, "m_mp_games"), i_ID);
  if (callNamed("voidp", tGame)) {
  return callNamed("error", _me, lingoBinary("joinPad", lingoBinary("joinPad", "GameID", i_ID), "not found"), symbol("setParticipantData"));
  }

  var t_rParticipant = callMethod("GetParticipant", tGame.data, i_iAvatarRef);
  if ((lingoTruthy(callNamed("voidp", t_rParticipant)) ? 0 : 1)) {
  callMethod("SetParameter", t_rParticipant, "Team", i_iTeam)
  for (var j = 1; j <= i_ar_data.count; ++j) {
  var tKey = callMethod("getPropAt", i_ar_data, j);
  var tvalue = i_ar_data[j];
  callMethod("SetParameter", t_rParticipant, tKey, tvalue)
  }

  callNamed("put", lingoBinary("joinPad", "Participant data", callMethod("GetParameterList", t_rParticipant)))
  setMeProp(_me, "m_bDirty", 1);
  callMethod("CreateGameListContent", callMethod("getInterface", _me))
  callMethod("CreatePlayerListContent", callMethod("getInterface", _me))
  callMethod("CreateAttributeListContent", callMethod("getInterface", _me))
  callMethod("CreateMyAttributeListContent", callMethod("getInterface", _me))
  }

}

