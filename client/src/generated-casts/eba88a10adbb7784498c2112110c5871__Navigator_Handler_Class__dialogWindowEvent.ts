// eba88a10adbb7784498c2112110c5871.cct / Navigator Handler Class / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, a_sDialog: LingoValue, a_kEvent: LingoValue) {
  switch (a_sDialog) {
case "ConfirmRoomSell":
  if (lingoBinary("eq", a_kEvent, symbol("dialogOK"))) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "SellRoom", new LingoPropList([symbol("integer"), meProp(_me, "m_iSellRoomID"), symbol("integer"), 1]))
  } else {
  if (lingoBinary("eq", a_kEvent, symbol("dialogCancel"))) {
  }

  }

  break;
  }

}

