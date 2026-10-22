// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomInterface / ShowLoadBar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowLoadBar(_me: LingoMe, _this: LingoValue, a_sRoom: LingoValue, a_iRoomCode: LingoValue) {
  callMethod("HideNavigator", callMethod("getInterface", callNamed("getThread", "navigator")))
  callNamed("executeMessage", symbol("ui_StopWelcomeSound"))
  callMethod("hideLoadBar", _this)
  callNamed("executeMessage", symbol("ui_Fastpass"))
  if (callMethod("exists", callNamed("getObject", symbol("session")), "minigame")) {
  var t_sCurrentGame = callMethod("get", callNamed("getObject", symbol("session")), "minigame");
  } else {
  t_sCurrentGame = "";
  }

  if (lingoBinary("eq", t_sCurrentGame, "vmks")) {
  a_sRoom = callNamed("getText", "vmks.room.name.generic", "VMKS Room");
  }

  callNamed("ShowCustomLoadingScreen", a_iRoomCode)
  if (callNamed("createWindow", "room_load_wnd", "vmk_roomqueue.window", 0, 0)) {
  callNamed("executeMessage", "SetButtonStates", new LingoPropList([symbol("all"), 0]))
  var t_rWnd = callNamed("getWindow", "room_load_wnd");
  callMethod("center", t_rWnd)
  callMethod("registerClient", t_rWnd, callMethod("getID", _this))
  callMethod("registerProcedure", t_rWnd, symbol("_Events"), callMethod("getID", _this), symbol("mouseUp"))
  callNamed("executeMessage", symbol("ui_Fastpass"))
  if (callMethod("elementExists", t_rWnd, "roomqueue.destination")) {
  callMethod("hide", callMethod("getElement", t_rWnd, "roomqueue.cancel"))
  callMethod("setText", callMethod("getElement", t_rWnd, "roomqueue.destination"), a_sRoom)
  callNamed("createObject", "room_status_bar", "Loading Bar Class")
  var t_rProps = new LingoPropList([]);
  callMethod("setaProp", t_rProps, symbol("buffer"), callMethod("getProperty", callMethod("getElement", t_rWnd, "bar"), symbol("buffer")).image)
  callMethod("setaProp", t_rProps, symbol("width"), 200)
  callMethod("setaProp", t_rProps, symbol("height"), 20)
  callMethod("setaProp", t_rProps, symbol("type"), symbol("other"))
  callMethod("Define", callNamed("getObject", "room_status_bar"), callMethod("getID", callMethod("getComponent", _this)), t_rProps)
  callMethod("lock", callNamed("getWindowManager"))
  }

  callNamed("executeMessage", symbol("ui_Fastpass"))
  }

}

