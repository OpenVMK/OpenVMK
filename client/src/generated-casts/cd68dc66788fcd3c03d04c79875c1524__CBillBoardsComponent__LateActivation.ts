// cd68dc66788fcd3c03d04c79875c1524.cct / CBillBoardsComponent / LateActivation

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LateActivation(_me: LingoMe) {
  var tRoomTag = callMethod("getRoomTag", callMethod("getComponent", callNamed("getThread", symbol("RoomInfo"))));
  var t = 1;
  var tSomeThere = 1;
  while (tSomeThere) {
  var t_sTextName = lingoBinary("join", lingoBinary("join", lingoBinary("join", "room.", tRoomTag), ".board."), t);
  if (callNamed("textExists", t_sTextName)) {
  callMethod("InitBillBoard", meProp(_me, "m_boardMgr"), callNamed("value", callNamed("getText", lingoBinary("join", lingoBinary("join", lingoBinary("join", "room.", tRoomTag), ".board."), t))), tRoomTag)
  } else {
  tSomeThere = 0;
  }

  t = lingoBinary("add", t, 1);
  }

}

