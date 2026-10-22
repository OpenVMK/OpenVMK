// eba88a10adbb7784498c2112110c5871.cct / CNavigatorQueueInterface / dialogWindowEvent

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
case "ConfirmFastPass":
  if (lingoBinary("eq", a_kEvent, symbol("dialogOK"))) {
  callMethod("hideLoadBar", _me)
  var t_sCon = callNamed("getVariable", "main.connection.id", "VMK");
  if (callNamed("connectionExists", t_sCon)) {
  callMethod("send", callNamed("getConnection", t_sCon), "GetFastPass")
  }

  }

  break;
  }

}

