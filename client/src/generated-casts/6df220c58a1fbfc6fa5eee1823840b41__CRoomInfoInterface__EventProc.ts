// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoInterface / EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function EventProc(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_windowTitle"));
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (tElemID) {
case "close":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callMethod("showHide", callMethod("getComponent", _me))
  break;
case "roominfo.report.button":
  var t_desc = callMethod("getRoomDesc", callMethod("getComponent", _me));
  callNamed("executeMessage", symbol("call_for_help_report"), callMethod("getaProp", t_desc, symbol("owner")))
  break;
case "roominfog.editinfo.button":
  callMethod("CreateRoomNameWindow", _me)
  break;
case "roominfog.whoenters.button":
  callMethod("_OpenWhoEntersWindow", _me)
  break;
case "roominfog.furnishingmode.button":
case "furnishingmode.off":
case "furnishing.checkbox.text":
  if (lingoBinary("gt", callMethod("getProperty", callMethod("getElement", tWndObj, tElemID), symbol("blend")), 0)) {
  if (callMethod("getaProp", callMethod("getRoomDesc", callMethod("getComponent", _me)), symbol("control"))) {
  var t_bFurnish = callMethod("get", callNamed("getObject", symbol("session")), "room_furnish_mode");
  callMethod("set", callNamed("getObject", symbol("session")), "room_furnish_mode", (lingoTruthy(t_bFurnish) ? 0 : 1))
  callNamed("executeMessage", "room_furnish_mode", (lingoTruthy(t_bFurnish) ? 0 : 1))
  callMethod("setCheckBoxState", _me, "furnishingmode.off", callMethod("get", callNamed("getObject", symbol("session")), "room_furnish_mode"))
  }

  }

  break;
case "roominfog.clearroom.button":
  callMethod("sendClearRoomRequest", callMethod("getHandler", _me))
  break;
case "help":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callNamed("executeMessage", symbol("open_help_page"), "help.rooms.change", 1)
  break;
case "roominfog.createtickets.button":
  callMethod("_OpenTicketWindow", _me)
  break;
  break;
  break;
  }

  }

}

