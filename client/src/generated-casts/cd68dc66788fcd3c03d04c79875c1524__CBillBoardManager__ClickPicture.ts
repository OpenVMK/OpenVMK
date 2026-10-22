// cd68dc66788fcd3c03d04c79875c1524.cct / CBillBoardManager / ClickPicture

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ClickPicture(_me: LingoMe, a_tEvent: LingoValue, a_sEventID: LingoValue) {
  var tBoard = callMethod("getaProp", meProp(_me, "m_mp_boards"), a_sEventID);
  if ((lingoTruthy(callNamed("voidp", tBoard)) ? 0 : 1)) {
  if (lingoBinary("neq", tBoard.url, "")) {
  callNamed("gotoNetPage", tBoard.url, "_blank")
  }

  if (lingoBinary("neq", tBoard.space, -float(1))) {
  var tMsg = new LingoPropList([symbol("int"), tBoard.space, symbol("int"), -float(1)]);
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 31, tMsg)
  }

  }

}

