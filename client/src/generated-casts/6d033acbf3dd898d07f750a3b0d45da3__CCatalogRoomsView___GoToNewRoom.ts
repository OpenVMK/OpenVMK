// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogRoomsView / _GoToNewRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _GoToNewRoom(_me: LingoMe, _this: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_iMyRoomID"))) ? 0 : 1)) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 31, new LingoPropList([symbol("integer"), meProp(_me, "m_iMyRoomID"), symbol("integer"), -float(1)]))
  var t_rWindow = callNamed("getWindow", "RoomNameWnd");
  callMethod("close", t_rWindow)
  callNamed("executeMessage", symbol("ui_catalog"))
  } else {
  callNamed("put", "No room ID!!")
  }

}

