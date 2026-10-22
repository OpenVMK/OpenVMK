// vmk_pirates2_game_preshow_handler.cct / CPPSInterface / SelectShipDlgEventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SelectShipDlgEventProc(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sSelectShipWndTitle"));
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (tElemID) {
case "pirates.ship.pearl":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callMethod("show", callMethod("getElement", tWndObj, "pirates.shipselector1"))
  callMethod("hide", callMethod("getElement", tWndObj, "pirates.shipselector2"))
  callMethod("hide", callMethod("getElement", tWndObj, "pirates.shipselector3"))
  setMeProp(_me, "m_iShipType", 1);
  break;
case "pirates.ship.dutch":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callMethod("hide", callMethod("getElement", tWndObj, "pirates.shipselector1"))
  callMethod("show", callMethod("getElement", tWndObj, "pirates.shipselector2"))
  callMethod("hide", callMethod("getElement", tWndObj, "pirates.shipselector3"))
  setMeProp(_me, "m_iShipType", 2);
  break;
case "pirates.ship.wicked":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callMethod("hide", callMethod("getElement", tWndObj, "pirates.shipselector1"))
  callMethod("hide", callMethod("getElement", tWndObj, "pirates.shipselector2"))
  callMethod("show", callMethod("getElement", tWndObj, "pirates.shipselector3"))
  setMeProp(_me, "m_iShipType", 3);
  break;
case "button.pirates.selectship":
  if (lingoBinary("gt", meProp(_me, "m_ar_AIPlayer").count, 0)) {
  meProp(_me, "m_ar_AIPlayer")[symbol("ship")] = meProp(_me, "m_iShipType");
  callMethod("SendGameData", meProp(_me, "m_rLobby"), new LingoPropList(["a", meProp(_me, "m_ar_AIPlayer")[symbol("player")], "t", meProp(_me, "m_ar_AIPlayer")[symbol("ship")]]))
  setMeProp(_me, "m_ar_AIPlayer", new LingoPropList([]));
  } else {
  callMethod("SendParticipantData", meProp(_me, "m_rLobby"), meProp(_me, "m_iSelectedAvatar"), new LingoPropList(["t", meProp(_me, "m_iShipType")]))
  }

  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callNamed("removeWindow", meProp(_me, "m_sSelectShipWndTitle"))
  break;
case "pirates.close":
case "button.pirates.cancel":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callNamed("removeWindow", meProp(_me, "m_sSelectShipWndTitle"))
  break;
case "pirates.help":
  callNamed("executeMessage", symbol("open_help_page"), "help.games.pirates")
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "SelectShipDlgEventProc", tElemID))
  break;
  }

  }

}

