// vmk_pirates2_game_preshow_handler.cct / CPPSInterface / JoinGame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function JoinGame(_me: LingoMe, i_iGameID: LingoValue, i_iTeamID: LingoValue) {
  var t_iGameConditions = callMethod("GetGameConditions", meProp(_me, "m_rLobby"));
  var t_iCost = callNamed("integer", t_iGameConditions["c"]);
  switch (t_iCost) {
case 0:
  var t_ar_GameData = new LingoPropList(["c", callNamed("string", t_iCost)]);
  callMethod("JoinGame", meProp(_me, "m_rLobby"), i_iGameID, i_iTeamID, t_ar_GameData)
  setMeProp(_me, "m_iMyTeam", i_iTeamID);
  break;
  default:
  callMethod("createJoinGameConditionsDialog", _me, i_iGameID, i_iTeamID, t_iCost)
  }

}

