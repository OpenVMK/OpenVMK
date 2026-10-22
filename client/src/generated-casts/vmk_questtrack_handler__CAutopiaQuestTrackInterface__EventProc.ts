// vmk_questtrack_handler.cct / CAutopiaQuestTrackInterface / EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function EventProc(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  if (theProperty("doubleClick")) {
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  var t_rRoomItem = callMethod("Search", tRoomContext, "TYPE", "406");
  if ((lingoTruthy(callNamed("voidp", t_rRoomItem)) ? 0 : 1)) {
  var t_iRef = callNamed("integer", callMethod("GetParam", t_rRoomItem, "REF"));
  callMethod("send", callNamed("getConnection", "VMK"), "UseItem", new LingoPropList([symbol("int"), t_iRef, symbol("int"), 0]))
  }

  }

  }

}

