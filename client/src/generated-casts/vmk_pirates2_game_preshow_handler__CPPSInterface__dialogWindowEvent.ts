// vmk_pirates2_game_preshow_handler.cct / CPPSInterface / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, t_dialogName: LingoValue, t_dialogEvent: LingoValue, t_rdata: LingoValue) {
  switch (t_dialogName) {
case "pirates_confirm_ai_player":
  switch (t_dialogEvent) {
case symbol("Ok"):
  setMeProp(_me, "m_iShipType", 2);
  callMethod("createSelectShipDialog", _me, undefined)
  break;
case symbol("cancel"):
  callNamed("nothing")
  break;
  }

  break;
case "pirates_join_game_conditions":
  switch (t_dialogEvent) {
case symbol("Ok"):
  var t_iGameID = t_rdata[1];
  var t_iTeamID = t_rdata[2];
  var t_ar_GameData = new LingoPropList(["c", callNamed("string", t_rdata[3])]);
  callMethod("JoinGame", meProp(_me, "m_rLobby"), t_iGameID, t_iTeamID, t_ar_GameData)
  setMeProp(_me, "m_iMyTeam", t_iTeamID);
  break;
case symbol("cancel"):
  callNamed("nothing")
  break;
  }

  break;
case "pirates_create_game_conditions":
  switch (t_dialogEvent) {
case symbol("Ok"):
  callMethod("CreateStartGameWindow", _me)
  break;
case symbol("cancel"):
  callNamed("nothing")
  break;
  }

  break;
case "pirates_select_game_type":
  switch (t_dialogEvent) {
case symbol("ctf"):
  setMeProp(_me, "m_iGameMode", 1);
  break;
case symbol("lsm"):
  setMeProp(_me, "m_iGameMode", 2);
  break;
  }

  break;
case "pirates_select_ship_type":
  switch (t_dialogEvent) {
case symbol("ship1"):
  setMeProp(_me, "m_iShipType", 1);
  break;
case symbol("ship2"):
  setMeProp(_me, "m_iShipType", 2);
  break;
case symbol("ship3"):
  setMeProp(_me, "m_iShipType", 3);
  break;
  default:
  setMeProp(_me, "m_iShipType", 1);
  }

  callMethod("SendParticipantData", meProp(_me, "m_rLobby"), t_rdata, new LingoPropList(["t", meProp(_me, "m_iShipType")]))
  break;
  }

  callNamed("removeDialogWindow", t_dialogName)
}

