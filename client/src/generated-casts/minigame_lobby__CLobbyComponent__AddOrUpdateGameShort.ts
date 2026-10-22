// minigame_lobby.cct / CLobbyComponent / AddOrUpdateGameShort

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AddOrUpdateGameShort(_me: LingoMe, i_ID: LingoValue, i_sDescription: LingoValue, a_iNumParticipants: LingoValue, a_iTimeLeft: LingoValue) {
  var tGame = callMethod("getaProp", meProp(_me, "m_mp_games"), i_ID);
  if (callNamed("voidp", tGame)) {
  callMethod("setaProp", meProp(_me, "m_mp_games"), i_ID, new LingoPropList([symbol("desc"), i_sDescription, symbol("data"), undefined]))
  tGame = callMethod("getaProp", meProp(_me, "m_mp_games"), i_ID);
  }

  setThePropOf(tGame, "desc", i_sDescription);
  if (callNamed("voidp", tGame.data)) {
  callMethod("setaProp", tGame, symbol("data"), callNamed("createObject", lingoBinary("join", "GameContainer:", i_ID), "CGameContainer"))
  }

  callMethod("SetParameter", tGame.data, "GameID", i_ID)
  callMethod("SetParameter", tGame.data, "GameName", i_sDescription)
  callMethod("SetParameter", tGame.data, "NumParticipants", a_iNumParticipants)
  callMethod("SetParameter", tGame.data, "TimeLeft", a_iTimeLeft)
  setMeProp(_me, "m_bDirty", 1);
}

