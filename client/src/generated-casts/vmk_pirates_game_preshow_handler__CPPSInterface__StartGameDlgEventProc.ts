// vmk_pirates_game_preshow_handler.cct / CPPSInterface / StartGameDlgEventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StartGameDlgEventProc(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sStartGameDlgWndTitle"));
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (tElemID) {
case "button.pirates.creategame":
  if (lingoBinary("neq", meProp(_me, "m_iGameLevel"), 0)) {
  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  callMethod("LeaveCurrentGame", meProp(_me, "m_rLobby"))
  callMethod("hide", callMethod("getElement", tWndObj, "pirates.levelselector1"))
  callMethod("hide", callMethod("getElement", tWndObj, "pirates.levelselector2"))
  callMethod("hide", callMethod("getElement", tWndObj, "pirates.levelselector3"))
  callMethod("CreateGame", meProp(_me, "m_rLobby"), new LingoPropList(["l", callNamed("string", meProp(_me, "m_iGameLevel"))]))
  callNamed("removeWindow", meProp(_me, "m_sStartGameDlgWndTitle"))
  switch (meProp(_me, "m_iGameLevel")) {
case 1:
  callMethod("CreateGamePrestartWindow", _me, callNamed("getText", "pps_create_lev_1_game"))
  break;
case 2:
  callMethod("CreateGamePrestartWindow", _me, callNamed("getText", "pps_create_lev_2_game"))
  break;
case 3:
  callMethod("CreateGamePrestartWindow", _me, callNamed("getText", "pps_create_lev_3_game"))
  break;
  }

  setMeProp(_me, "m_iMyTeam", 1);
  }

  break;
case "pirates.level1.preview":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  setMeProp(_me, "m_iGameLevel", 1);
  callMethod("show", callMethod("getElement", tWndObj, "pirates.levelselector1"))
  callMethod("hide", callMethod("getElement", tWndObj, "pirates.levelselector2"))
  callMethod("hide", callMethod("getElement", tWndObj, "pirates.levelselector3"))
  break;
case "pirates.level2.preview":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  setMeProp(_me, "m_iGameLevel", 2);
  callMethod("hide", callMethod("getElement", tWndObj, "pirates.levelselector1"))
  callMethod("show", callMethod("getElement", tWndObj, "pirates.levelselector2"))
  callMethod("hide", callMethod("getElement", tWndObj, "pirates.levelselector3"))
  break;
case "pirates.level3.preview":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  setMeProp(_me, "m_iGameLevel", 3);
  callMethod("hide", callMethod("getElement", tWndObj, "pirates.levelselector1"))
  callMethod("hide", callMethod("getElement", tWndObj, "pirates.levelselector2"))
  callMethod("show", callMethod("getElement", tWndObj, "pirates.levelselector3"))
  break;
case "pirates.close":
case "button.pirates.cancel":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callNamed("removeWindow", meProp(_me, "m_sStartGameDlgWndTitle"))
  break;
case "pirates.help":
  callNamed("executeMessage", symbol("open_help_page"), "help.games.pirates")
  break;
  break;
  }

  }

}

