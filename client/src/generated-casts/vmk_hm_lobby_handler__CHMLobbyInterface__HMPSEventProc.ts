// vmk_hm_lobby_handler.cct / CHMLobbyInterface / HMPSEventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HMPSEventProc(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  callMethod("deactivate", callNamed("getWindowManager"), meProp(_me, "m_sGamelistWndTitle"))
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  var tGameList = callMethod("GetGameList", meProp(_me, "m_rLobby"));
  switch (tElemID) {
case "button.next":
  setMeProp(_me, "m_iListDisplayOffset", lingoBinary("add", meProp(_me, "m_iListDisplayOffset"), 1));
  if (lingoBinary("gt", meProp(_me, "m_iListDisplayOffset"), lingoBinary("sub", tGameList.count, 1))) {
  setMeProp(_me, "m_iListDisplayOffset", lingoBinary("sub", tGameList.count, 1));
  }

  if (lingoBinary("lt", meProp(_me, "m_iListDisplayOffset"), 1)) {
  setMeProp(_me, "m_iListDisplayOffset", 1);
  }

  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callMethod("refreshOnScreen", _me)
  break;
case "button.previous":
  setMeProp(_me, "m_iListDisplayOffset", lingoBinary("sub", meProp(_me, "m_iListDisplayOffset"), 1));
  if (lingoBinary("lt", meProp(_me, "m_iListDisplayOffset"), 1)) {
  setMeProp(_me, "m_iListDisplayOffset", 1);
  }

  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callMethod("refreshOnScreen", _me)
  break;
case "button.join.redteam":
  if (lingoBinary("gte", tGameList.count, meProp(_me, "m_iListDisplayOffset"))) {
  var tGameID = callMethod("getPropAt", tGameList, meProp(_me, "m_iListDisplayOffset"));
  if (callNamed("voidp", callMethod("CurrentGame", meProp(_me, "m_rLobby")))) {
  callMethod("JoinGame", meProp(_me, "m_rLobby"), tGameID, 1)
  setMeProp(_me, "m_iMyTeam", 1);
  } else {
  if (lingoBinary("or", lingoBinary("neq", meProp(_me, "m_iMyTeam"), 1), lingoBinary("neq", callMethod("GetParameterValue", callMethod("CurrentGame", meProp(_me, "m_rLobby")), "GameID"), tGameID))) {
  callMethod("LeaveCurrentGame", meProp(_me, "m_rLobby"))
  callMethod("JoinGame", meProp(_me, "m_rLobby"), tGameID, 1)
  setMeProp(_me, "m_iMyTeam", 1);
  }

  }

  if (callNamed("windowExists", meProp(_me, "m_sGamePrestartDlgWndTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sGamePrestartDlgWndTitle"))
  }

  }

  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  break;
case "button.join.blueteam":
  if (lingoBinary("gte", tGameList.count, meProp(_me, "m_iListDisplayOffset"))) {
  tGameID = callMethod("getPropAt", tGameList, meProp(_me, "m_iListDisplayOffset"));
  if (callNamed("voidp", callMethod("CurrentGame", meProp(_me, "m_rLobby")))) {
  callMethod("JoinGame", meProp(_me, "m_rLobby"), tGameID, 2)
  setMeProp(_me, "m_iMyTeam", 2);
  } else {
  if (lingoBinary("or", lingoBinary("neq", meProp(_me, "m_iMyTeam"), 2), lingoBinary("neq", callMethod("GetParameterValue", callMethod("CurrentGame", meProp(_me, "m_rLobby")), "GameID"), tGameID))) {
  callMethod("LeaveCurrentGame", meProp(_me, "m_rLobby"))
  callMethod("JoinGame", meProp(_me, "m_rLobby"), tGameID, 2)
  setMeProp(_me, "m_iMyTeam", 2);
  }

  }

  if (callNamed("windowExists", meProp(_me, "m_sGamePrestartDlgWndTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sGamePrestartDlgWndTitle"))
  }

  }

  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  break;
case "button.join.redteam2":
  if (lingoBinary("gte", tGameList.count, lingoBinary("add", meProp(_me, "m_iListDisplayOffset"), 1))) {
  tGameID = callMethod("getPropAt", tGameList, lingoBinary("add", meProp(_me, "m_iListDisplayOffset"), 1));
  if (callNamed("voidp", callMethod("CurrentGame", meProp(_me, "m_rLobby")))) {
  callMethod("JoinGame", meProp(_me, "m_rLobby"), tGameID, 1)
  setMeProp(_me, "m_iMyTeam", 1);
  } else {
  if (lingoBinary("or", lingoBinary("neq", meProp(_me, "m_iMyTeam"), 1), lingoBinary("neq", callMethod("GetParameterValue", callMethod("CurrentGame", meProp(_me, "m_rLobby")), "GameID"), tGameID))) {
  callMethod("LeaveCurrentGame", meProp(_me, "m_rLobby"))
  callMethod("JoinGame", meProp(_me, "m_rLobby"), tGameID, 1)
  setMeProp(_me, "m_iMyTeam", 1);
  }

  }

  if (callNamed("windowExists", meProp(_me, "m_sGamePrestartDlgWndTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sGamePrestartDlgWndTitle"))
  }

  }

  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  break;
case "button.join.blueteam2":
  if (lingoBinary("gte", tGameList.count, lingoBinary("add", meProp(_me, "m_iListDisplayOffset"), 1))) {
  tGameID = callMethod("getPropAt", tGameList, lingoBinary("add", meProp(_me, "m_iListDisplayOffset"), 1));
  if (callNamed("voidp", callMethod("CurrentGame", meProp(_me, "m_rLobby")))) {
  callMethod("JoinGame", meProp(_me, "m_rLobby"), tGameID, 2)
  setMeProp(_me, "m_iMyTeam", 2);
  } else {
  if (lingoBinary("or", lingoBinary("neq", meProp(_me, "m_iMyTeam"), 2), lingoBinary("neq", callMethod("GetParameterValue", callMethod("CurrentGame", meProp(_me, "m_rLobby")), "GameID"), tGameID))) {
  callMethod("LeaveCurrentGame", meProp(_me, "m_rLobby"))
  callMethod("JoinGame", meProp(_me, "m_rLobby"), tGameID, 2)
  setMeProp(_me, "m_iMyTeam", 2);
  }

  }

  if (callNamed("windowExists", meProp(_me, "m_sGamePrestartDlgWndTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sGamePrestartDlgWndTitle"))
  }

  }

  break;
case "button.leave.redteam":
case "button.leave.blueteam":
case "button.leave.redteam2":
case "button.leave.blueteam2":
  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  if (lingoBinary("eq", callMethod("GetMyGame", meProp(_me, "m_rLobby")), callMethod("CurrentGame", meProp(_me, "m_rLobby")))) {
  callNamed("removeWindow", meProp(_me, "m_sGamePrestartDlgWndTitle"))
  }

  callMethod("LeaveCurrentGame", meProp(_me, "m_rLobby"))
  setMeProp(_me, "m_iMyTeam", 0);
  break;
case "button.newgame":
  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  callMethod("LeaveCurrentGame", meProp(_me, "m_rLobby"))
  callMethod("CreateGame", meProp(_me, "m_rLobby"), new LingoPropList(["l", callNamed("string", meProp(_me, "m_iGameLevel"))]))
  callMethod("CreateGamePrestartWindow", _me, callNamed("getText", "hmg.ps.create.game"))
  setMeProp(_me, "m_iMyTeam", 1);
  callNamed("createTimeout", symbol("HMPS_updatestartbutton"), 500, symbol("checkStartGameButton"), callMethod("getID", _me), undefined, 1)
  break;
case "button.moregames":
  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  callMethod("CreateHighscoreWindow", _me)
  break;
case "button.instructions":
  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  callMethod("CreateInstructionsWindow", _me)
  break;
  break;
  break;
  break;
  }

  }

}

