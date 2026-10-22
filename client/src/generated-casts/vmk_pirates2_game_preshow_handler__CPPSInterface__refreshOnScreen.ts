// vmk_pirates2_game_preshow_handler.cct / CPPSInterface / refreshOnScreen

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function refreshOnScreen(_me: LingoMe) {
  callMethod("ClearGameDisplays", _me)
  var tGame = callMethod("GetGameByIndex", meProp(_me, "m_rLobby"), meProp(_me, "m_iListDisplayOffset"));
  if (callNamed("objectp", tGame)) {
  callMethod("CreateGameDisplay", _me, symbol("left"), tGame)
  }

  tGame = callMethod("GetGameByIndex", meProp(_me, "m_rLobby"), lingoBinary("add", meProp(_me, "m_iListDisplayOffset"), 1));
  if (callNamed("objectp", tGame)) {
  callMethod("CreateGameDisplay", _me, symbol("right"), tGame)
  }

  tGame = callMethod("CurrentGame", meProp(_me, "m_rLobby"));
  if ((lingoTruthy(callNamed("voidp", tGame)) ? 0 : 1)) {
  var tOfs = callMethod("findGameByID", _me, callMethod("GetParameterValue", tGame, "GameID"));
  if (lingoBinary("eq", tOfs, 0)) {
  return callNamed("error", _me, "Pirates Lobby: Could not find reference to current game ID", symbol("refreshOnScreen"));
  }

  callMethod("SetJoinLeaveButtons", _me, tOfs, meProp(_me, "m_iMyTeam"))
  } else {
  callMethod("SetJoinLeaveButtons", _me, 0, 0)
  }

  callMethod("SetScrollArrows", _me)
}

