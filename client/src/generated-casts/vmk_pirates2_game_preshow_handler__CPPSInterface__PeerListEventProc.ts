// vmk_pirates2_game_preshow_handler.cct / CPPSInterface / PeerListEventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PeerListEventProc(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sPeerlistWndTitle"));
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (tElemID) {
case "pirates.selectroom.list":
  if ((lingoTruthy(callNamed("voidp", tWndObj)) ? 0 : 1)) {
  var tElement = callMethod("getElement", tWndObj, "pirates.selectroom.list");
  callMethod("feedImage", tElement, callMethod("click", meProp(_me, "m_rRoomInstanceList"), tParm))
  }

  break;
case "button.pirates.gotoroom":
  if (lingoBinary("and", lingoBinary("neq", callMethod("GetSelected", meProp(_me, "m_rRoomInstanceList")), 0), lingoBinary("neq", meProp(_me, "m_iSpaceID"), -float(1)))) {
  var tInstanceID = callMethod("getLink", callMethod("GetItem", meProp(_me, "m_rRoomInstanceList"), callMethod("GetSelected", meProp(_me, "m_rRoomInstanceList")))).id;
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 31, new LingoPropList([symbol("int"), meProp(_me, "m_iSpaceID"), symbol("int"), tInstanceID]))
  }

  break;
case "pirates.close":
case "button.pirates.cancel":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callNamed("removeWindow", meProp(_me, "m_sPeerlistWndTitle"))
  break;
case "pirates.help":
  callNamed("executeMessage", symbol("open_help_page"), "help.games.pirates")
  break;
  break;
  }

  }

}

