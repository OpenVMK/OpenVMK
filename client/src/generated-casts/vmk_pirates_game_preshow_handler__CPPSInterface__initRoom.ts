// vmk_pirates_game_preshow_handler.cct / CPPSInterface / initRoom

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
  // HAND-CORRECTED: the 2005 lobby (Classics Lobby, room 1010) shares the
  // `pirates.instructions.*` keys with the 2006 game, and the texts now hold
  // the 2006 pages, whose pictures (`pirates2.*`) only the 2006 cast has. The
  // 2005 pages are kept under `pirates.classic.instructions.*` (copied from
  // Disney's own older texts, assets/external_texts_181_disney.txt).
  setMeProp(_me, "m_ar_instructionspages", new LingoList(["pirates.classic.instructions.text.page.1", "pirates.classic.instructions.text.page.2", "pirates.classic.instructions.text.page.3", "pirates.classic.instructions.text.page.4", "pirates.classic.instructions.text.page.5", "pirates.classic.instructions.text.page.6", "pirates.classic.instructions.text.page.7", "pirates.classic.instructions.text.page.8"]));
  setMeProp(_me, "m_ar_instructionsimage", new LingoList(["pirates.classic.instructions.pic.page.1", "pirates.classic.instructions.pic.page.2", "pirates.classic.instructions.pic.page.3", "pirates.classic.instructions.pic.page.4", "pirates.classic.instructions.pic.page.5", "pirates.classic.instructions.pic.page.6", "pirates.classic.instructions.pic.page.7", "pirates.classic.instructions.pic.page.8"]));
  setMeProp(_me, "m_iCurInstructionsPage", 1);
  setMeProp(_me, "m_iSelectedInstance", 0);
  setMeProp(_me, "m_iSpaceID", -float(1));
  if ((lingoTruthy(meProp(_me, "m_gameOn")) ? 0 : 1)) {
  callMethod("CreateInterface", _me)
  callMethod("CreateHighscorePlaque", _me)
  callNamed("registerMessage", symbol("ShowPPSInterface"), callMethod("getID", _me), symbol("ShowInterface"))
  callNamed("registerMessage", symbol("HidePPSInterface"), callMethod("getID", _me), symbol("HideInterface"))
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

