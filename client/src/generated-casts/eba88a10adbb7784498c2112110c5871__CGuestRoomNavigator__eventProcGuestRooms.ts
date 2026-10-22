// eba88a10adbb7784498c2112110c5871.cct / CGuestRoomNavigator / eventProcGuestRooms

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcGuestRooms(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (tElemID) {
case "close":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callNamed("removeWindow", meProp(_me, "m_sWindowTitle"))
  break;
case "help":
  callMethod("setProperty", callNamed("getWindow", meProp(_me, "m_sWindowTitle")), symbol("modal"), 0)
  callNamed("executeMessage", symbol("open_help_page"), "help.navigation.navigator")
  break;
case "nav.tab.popguestrooms.passive":
  callMethod("ChangePage", _me, symbol("popular"))
  break;
case "nav.tab.friendsrooms.passive":
  callMethod("ChangePage", _me, symbol("friends"))
  break;
case "nav.tab.ownrooms.passive":
  callMethod("ChangePage", _me, symbol("own"))
  break;
case "nav.searchrooms.button":
  callMethod("SearchRooms", _me, callMethod("getText", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sWindowTitle")), "nav.roomsearch.field")))
  break;
case "nav.gotoroom.button":
  var tSelectedRoomID = callMethod("GetSelectedRoomID", _me);
  if (lingoBinary("neq", tSelectedRoomID, -float(1))) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 31, new LingoPropList([symbol("integer"), tSelectedRoomID, symbol("integer"), -float(1)]))
  }

  callNamed("executeMessage", "ui_navigator")
  callNamed("removeWindow", meProp(_me, "m_sWindowTitle"))
  break;
case "nav.modifyroom.button":
  tSelectedRoomID = callMethod("GetSelectedRoomID", _me);
  if (lingoBinary("neq", tSelectedRoomID, -float(1))) {
  setMeProp(_me, "m_sRoomName", meProp(_me, "m_selectedRoomData")["Name"]);
  setMeProp(_me, "m_sRoomDesc", meProp(_me, "m_selectedRoomData")["Description"]);
  callMethod("CreateRoomNameWindow", _me)
  }

  break;
case "nav.deleteroom.button":
  var tContext = callMethod("_AccessRoom", callNamed("getThread", "room").component);
  if (callNamed("voidp", tContext)) {
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "RoomSellNotAvailable", 1, 1);
  callMethod("show", t)
  callMethod("setText", t, callNamed("getText", "nav.sellnotavailable.desc"), callNamed("getText", "nav.sellnotavailable.title"), callNamed("getText", "nav.sellnotavailable.ok"))
  }

  tSelectedRoomID = callMethod("GetSelectedRoomID", _me);
  if (lingoBinary("neq", tSelectedRoomID, -float(1))) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "SellRoom", new LingoPropList([symbol("integer"), tSelectedRoomID, symbol("integer"), 0]))
  }

  break;
case "nav.roomlist":
  var t_mpEvent = new LingoPropList([symbol("found"), 0, symbol("event"), "", symbol("client"), undefined, symbol("route"), new LingoPropList([])]);
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callMethod("EventProc", meProp(_me, "m_ar_components")[tElemID], tParm, t_mpEvent)
  if (callNamed("objectp", t_mpEvent[symbol("client")])) {
  var t_Selected = callMethod("GetNode", t_mpEvent[symbol("client")]);
  if ((lingoTruthy(callNamed("voidp", t_Selected)) ? 0 : 1)) {
  setMeProp(_me, "m_selectedRoomData", t_Selected);
  callMethod("setText", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sWindowTitle")), "nav.roominfo.owner"), meProp(_me, "m_selectedRoomData")["Owner"])
  callMethod("setText", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sWindowTitle")), "nav.roominfo.description"), meProp(_me, "m_selectedRoomData")["Description"])
  callMethod("showPopulation", _me)
  callMethod("setButtonState", _me, "nav.gotoroom.button", 1)
  switch (meProp(_me, "m_page")) {
case symbol("own"):
  callMethod("setButtonState", _me, "nav.modifyroom.button", 1)
  callMethod("setButtonState", _me, "nav.deleteroom.button", 1)
  break;
  }

  } else {
  setMeProp(_me, "m_selectedRoomData", new LingoPropList([]));
  callMethod("setText", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sWindowTitle")), "nav.roominfo.owner"), "")
  callMethod("setText", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sWindowTitle")), "nav.roominfo.description"), "")
  callMethod("clearPopulation", _me)
  callMethod("setButtonState", _me, "nav.modifyroom.button", 0)
  callMethod("setButtonState", _me, "nav.gotoroom.button", 0)
  callMethod("setButtonState", _me, "nav.deleteroom.button", 0)
  }

  }

  var t_rClientElement = callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sWindowTitle")), tElemID);
  var t_rImg = callMethod("render", meProp(_me, "m_ar_components")[tElemID]);
  callMethod("feedImage", t_rClientElement, t_rImg)
  break;
  }

  }

}

