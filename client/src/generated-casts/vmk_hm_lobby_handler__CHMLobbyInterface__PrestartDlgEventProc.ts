// vmk_hm_lobby_handler.cct / CHMLobbyInterface / PrestartDlgEventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PrestartDlgEventProc(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sGamePrestartDlgWndTitle"));
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (tElemID) {
case "button.hm.startnow":
  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  callNamed("removeUpdate", callMethod("getID", _me))
  callMethod("StartMyGame", meProp(_me, "m_rLobby"))
  break;
case "button.hmkick.red1":
  if (lingoBinary("gte", meProp(_me, "m_ar_leftTeamParticipants").count, 1)) {
  callMethod("KickAvatarFromMyGame", meProp(_me, "m_rLobby"), callMethod("GetParameterValue", meProp(_me, "m_ar_leftTeamParticipants")[1], symbol("AvatarRef")))
  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  }

  break;
case "button.hmkick.red2":
  if (lingoBinary("gte", meProp(_me, "m_ar_leftTeamParticipants").count, 2)) {
  callMethod("KickAvatarFromMyGame", meProp(_me, "m_rLobby"), callMethod("GetParameterValue", meProp(_me, "m_ar_leftTeamParticipants")[2], symbol("AvatarRef")))
  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  }

  break;
case "button.hmkick.red3":
  if (lingoBinary("gte", meProp(_me, "m_ar_leftTeamParticipants").count, 3)) {
  callMethod("KickAvatarFromMyGame", meProp(_me, "m_rLobby"), callMethod("GetParameterValue", meProp(_me, "m_ar_leftTeamParticipants")[3], symbol("AvatarRef")))
  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  }

  break;
case "button.hmkick.red4":
  if (lingoBinary("gte", meProp(_me, "m_ar_leftTeamParticipants").count, 4)) {
  callMethod("KickAvatarFromMyGame", meProp(_me, "m_rLobby"), callMethod("GetParameterValue", meProp(_me, "m_ar_leftTeamParticipants")[4], symbol("AvatarRef")))
  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  }

  break;
case "button.hmkick.blue1":
  if (lingoBinary("gte", meProp(_me, "m_ar_rightTeamParticipants").count, 1)) {
  callMethod("KickAvatarFromMyGame", meProp(_me, "m_rLobby"), callMethod("GetParameterValue", meProp(_me, "m_ar_rightTeamParticipants")[1], symbol("AvatarRef")))
  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  }

  break;
case "button.hmkick.blue2":
  if (lingoBinary("gte", meProp(_me, "m_ar_rightTeamParticipants").count, 2)) {
  callMethod("KickAvatarFromMyGame", meProp(_me, "m_rLobby"), callMethod("GetParameterValue", meProp(_me, "m_ar_rightTeamParticipants")[2], symbol("AvatarRef")))
  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  }

  break;
case "button.hmkick.blue3":
  if (lingoBinary("gte", meProp(_me, "m_ar_rightTeamParticipants").count, 3)) {
  callMethod("KickAvatarFromMyGame", meProp(_me, "m_rLobby"), callMethod("GetParameterValue", meProp(_me, "m_ar_rightTeamParticipants")[3], symbol("AvatarRef")))
  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  }

  break;
case "button.hmkick.blue4":
  if (lingoBinary("gte", meProp(_me, "m_ar_rightTeamParticipants").count, 4)) {
  callMethod("KickAvatarFromMyGame", meProp(_me, "m_rLobby"), callMethod("GetParameterValue", meProp(_me, "m_ar_rightTeamParticipants")[4], symbol("AvatarRef")))
  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  }

  break;
case "button.hm.cancel":
case "hm.close":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callMethod("RemoveMyGame", meProp(_me, "m_rLobby"))
  callNamed("removeWindow", meProp(_me, "m_sGamePrestartDlgWndTitle"))
  callMethod("EnableStartAndMoreRooms", _me)
  break;
case "hm.help":
  callNamed("executeMessage", symbol("open_help_page"), "help.games.hauntedmansion")
  break;
  break;
  }

  }

}

