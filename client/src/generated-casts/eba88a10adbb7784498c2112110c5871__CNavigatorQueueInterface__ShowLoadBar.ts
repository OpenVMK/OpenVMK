// eba88a10adbb7784498c2112110c5871.cct / CNavigatorQueueInterface / ShowLoadBar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowLoadBar(_me: LingoMe, a_sRoom: LingoValue, a_iRoomCode: LingoValue) {
  callMethod("hideLoadBar", _me)
  callNamed("ShowCustomLoadingScreen", a_iRoomCode)
  if (callNamed("createWindow", meProp(_me, "m_sWindow"), "vmk_roomqueue_guest.window", 0, 0)) {
  var t_rWnd = callNamed("getWindow", meProp(_me, "m_sWindow"));
  callMethod("center", t_rWnd)
  callMethod("registerClient", t_rWnd, callMethod("getID", _me))
  callMethod("registerProcedure", t_rWnd, symbol("_Events"), callMethod("getID", _me), symbol("mouseUp"))
  callNamed("executeMessage", "SetButtonStates", new LingoPropList([symbol("all"), 0]))
  if (callMethod("elementExists", t_rWnd, "roomqueue.destination")) {
  callNamed("createObject", "room_status_bar", "Loading Bar Class")
  var t_rProps = new LingoPropList([]);
  callMethod("setaProp", t_rProps, symbol("buffer"), callMethod("getProperty", callMethod("getElement", t_rWnd, "bar"), symbol("buffer")).image)
  callMethod("setaProp", t_rProps, symbol("width"), 200)
  callMethod("setaProp", t_rProps, symbol("height"), 20)
  callMethod("setaProp", t_rProps, symbol("type"), symbol("other"))
  callMethod("Define", callNamed("getObject", "room_status_bar"), callMethod("getID", _me), t_rProps)
  }

  callNamed("executeMessage", symbol("ui_Fastpass"))
  }

}

