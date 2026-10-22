// vmk_hm_lobby_handler.cct / CHMLobbyInterface / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, t_dialogName: LingoValue, t_dialogEvent: LingoValue) {
  switch (t_dialogName) {
case "hm.game.dialog.startGame":
  switch (t_dialogEvent) {
case symbol("dialogOK"):
  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  callNamed("removeUpdate", callMethod("getID", _me))
  callMethod("StartMyGame", meProp(_me, "m_rLobby"))
  break;
case symbol("dialogCancel"):
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callMethod("RemoveMyGame", meProp(_me, "m_rLobby"))
  callNamed("removeWindow", meProp(_me, "m_sGamePrestartDlgWndTitle"))
  callMethod("EnableStartAndMoreRooms", _me)
  break;
  }

  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Unknown Dialog Window", t_dialogName))
  }

}

