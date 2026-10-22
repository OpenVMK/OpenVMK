// vmk_furniture_code.cct / CRoomItemProximityConfig / select

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function select(_me: LingoMe) {
  var t_ar_roomProperties = new LingoPropList([symbol("owner"), ""]);
  if (callNamed("objectp", callNamed("getThread", symbol("RoomInfo")))) {
  t_ar_roomProperties = callMethod("getRoomDesc", callMethod("getComponent", callNamed("getThread", symbol("RoomInfo"))));
  }

  var t_bAllow = 0;
  if (lingoBinary("eq", meProp(_me, "m_iRoomType"), symbol("private"))) {
  var t_sName = "";
  if (callMethod("exists", callNamed("getObject", symbol("session")), "name")) {
  t_sName = callMethod("get", callNamed("getObject", symbol("session")), "name");
  }

  t_bAllow = lingoBinary("eq", callMethod("getaProp", t_ar_roomProperties, symbol("owner")), t_sName);
  } else {
  }

  if (t_bAllow) {
  setMeProp(_me, "m_bShowTiles", 1);
  setMeProp(_me, "m_bReady", 0);
  var t_iRef = callNamed("integer", callMethod("GetParam", callMethod("getObject", _me), "REF"));
  callMethod("send", callNamed("getConnection", "VMK"), "UseItem", new LingoPropList([symbol("int"), t_iRef, symbol("int"), 0]))
  } else {
  var t_rEventProcessor = callNamed("getObject", "RoomEventProcessor");
  if (lingoBinary("neq", t_rEventProcessor, 0)) {
  callMethod("reset", t_rEventProcessor)
  }

  }

}

