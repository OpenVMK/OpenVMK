// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomInterface / _Events

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _Events(_me: LingoMe, _this: LingoValue, a_kEvt: LingoValue, a_sElm: LingoValue, a_vPrm: LingoValue, a_sWnd: LingoValue) {
  callNamed("executeMessage", symbol("ui_Fastpass"))
  switch (a_sElm) {
case "roomqueue.cancel":
  callMethod("hideLoadBar", _this)
  callMethod("_RemoveRoom", _this.component)
  var t_sConnection = callNamed("getVariable", "main.connection.id", "VMK");
  if (callNamed("connectionExists", t_sConnection)) {
  callMethod("send", callNamed("getConnection", t_sConnection), "CancelRoomQueue")
  }

  break;
  }

}

