// c7d81c175a2637e0193f0cf7bfd014ba.cct / CRoomItemEntranceFeeTurnStile / select

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function select(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("eq", callMethod("get", callNamed("getObject", symbol("session")), "RoomType"), symbol("private"))) {
  if (theProperty("doubleClick")) {
  var t_iRef = callNamed("integer", callMethod("GetParam", callMethod("getObject", _this), "REF"));
  callMethod("send", callNamed("getConnection", "VMK"), "UseItem", new LingoPropList([symbol("int"), t_iRef, symbol("int"), 0]))
  return callNamed("callAncestor", symbol("select"), _this);
  }

  } else {
  var t_rEventProcessor = callNamed("getObject", "RoomEventProcessor");
  if (lingoBinary("neq", t_rEventProcessor, 0)) {
  callMethod("reset", t_rEventProcessor)
  }

  }

}

