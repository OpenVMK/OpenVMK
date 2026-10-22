// eba88a10adbb7784498c2112110c5871.cct / NavigatorInterface Class / eventProcAdvNavigator

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcAdvNavigator(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (tElemID) {
case "nav.gotoroom.button":
  if (lingoBinary("neq", callMethod("GetSelected", meProp(_me, "m_pAdvancedNavItemList")), 0)) {
  var tInsId = callMethod("getaProp", callMethod("getLink", callMethod("GetItem", meProp(_me, "m_pAdvancedNavItemList"), callMethod("GetSelected", meProp(_me, "m_pAdvancedNavItemList")))), "instanceID");
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 31, new LingoPropList([symbol("integer"), meProp(_me, "m_activeRoomID"), symbol("integer"), tInsId]))
  callMethod("showhidenavigator", callMethod("getInterface", _me))
  } else {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 31, new LingoPropList([symbol("integer"), meProp(_me, "m_activeRoomID"), symbol("integer"), -float(1)]))
  callNamed("executeMessage", "PlayInterfaceSound", "map-room-selection")
  callMethod("showhidenavigator", _me)
  }

  break;
case "nav.advancedlist":
  var tElement = callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sAdvancedModeWindowTitle")), "nav.advancedlist");
  var tRect = callMethod("getProperty", tElement, symbol("rect"));
  callMethod("feedImage", tElement, callMethod("click", meProp(_me, "m_pAdvancedNavItemList"), tParm))
  if (lingoBinary("neq", callMethod("GetSelected", meProp(_me, "m_pAdvancedNavItemList")), 0)) {
  var tItem = callMethod("GetItem", meProp(_me, "m_pAdvancedNavItemList"), callMethod("GetSelected", meProp(_me, "m_pAdvancedNavItemList")));
  setMeProp(_me, "m_mp_advancedSelectedData", callMethod("getLink", tItem));
  } else {
  setMeProp(_me, "m_mp_advancedSelectedData", new LingoPropList([]));
  }

  break;
case "close":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callMethod("hide", callNamed("getWindow", meProp(_me, "m_sAdvancedModeWindowTitle")))
  break;
case "help":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callNamed("executeMessage", symbol("open_help_page"), "help.navigation.navigator")
  break;
  }

  }

}

