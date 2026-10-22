// vmk_hm_lobby_handler.cct / CHMLobbyInterface / initRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initRoom(_me: LingoMe) {
  setMeProp(_me, "m_ar_instanceTitles", callMethod("getRoomInstanceTitles", callMethod("getInterface", callNamed("getThread", "navigator"))));
  var t_iHMHelpPageCount = callNamed("value", callNamed("getText", "hm.instructions.page.count"));
  if (lingoBinary("lte", t_iHMHelpPageCount, 0)) {
  t_iHMHelpPageCount = 7;
  }

  setMeProp(_me, "m_ar_instructionspages", new LingoList([]));
  setMeProp(_me, "m_ar_instructionsimage", new LingoList([]));
  for (var i = 1; i <= t_iHMHelpPageCount; ++i) {
  callMethod("append", meProp(_me, "m_ar_instructionspages"), lingoBinary("join", "hm.instructions.text.page.", i))
  callMethod("append", meProp(_me, "m_ar_instructionsimage"), lingoBinary("join", "hm.instructions.pic.page.", i))
  }

  setMeProp(_me, "m_iCurInstructionsPage", 1);
  setMeProp(_me, "m_iSelectedInstance", 0);
  setMeProp(_me, "m_iSpaceID", -float(1));
  if ((lingoTruthy(meProp(_me, "m_gameOn")) ? 0 : 1)) {
  callMethod("CreateInterface", _me)
  callNamed("registerMessage", symbol("ShowHMPSInterface"), callMethod("getID", _me), symbol("ShowInterface"))
  callNamed("registerMessage", symbol("HideHMPSInterface"), callMethod("getID", _me), symbol("HideInterface"))
  setMeProp(_me, "m_iListDisplayOffset", 1);
  setMeProp(_me, "m_iGameLevel", 0);
  var m_sGameDescription = "My Game";
  setMeProp(_me, "m_ar_leftTeamParticipants", new LingoList([]));
  setMeProp(_me, "m_ar_rightTeamParticipants", new LingoList([]));
  setMeProp(_me, "m_ar_instances", new LingoList([]));
  callNamed("receiveUpdate", callMethod("getID", _me))
  var tLobbyThread = callNamed("getThread", "lobby");
  if (lingoBinary("eq", tLobbyThread, 0)) {
  return callNamed("error", _me, "Unable to connect to lobby thread", symbol("initRoom"));
  }

  setMeProp(_me, "m_rLobby", callMethod("getComponent", tLobbyThread));
  callMethod("InitService", meProp(_me, "m_rLobby"))
  setMeProp(_me, "m_rRoomInstanceList", callNamed("createObject", "RoomInstanceListView", "CRoomInstanceList"));
  callMethod("GetMoreGameRooms", _me)
  callMethod("EnableStartAndMoreRooms", _me)
  callMethod("refreshOnScreen", _me)
  } else {
  callMethod("CloseWindows", _me)
  }

}

