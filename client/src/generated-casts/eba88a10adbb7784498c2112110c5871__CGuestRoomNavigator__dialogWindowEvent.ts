// eba88a10adbb7784498c2112110c5871.cct / CGuestRoomNavigator / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, _this: LingoValue, t_dialogName: LingoValue, t_dialogEvent: LingoValue) {
  if (lingoBinary("eq", t_dialogName, "SearchAllRooms")) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_sSearchString"))) ? 0 : 1)) {
  if (lingoBinary("eq", t_dialogEvent, symbol("dialogCancel"))) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 28, new LingoPropList([symbol("string"), meProp(_me, "m_sSearchString")]))
  } else {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 38, new LingoPropList([symbol("string"), meProp(_me, "m_sSearchString")]))
  }

  }

  } else {
  callNamed("removeDialogWindow", "RoomCreationError")
  }

}

