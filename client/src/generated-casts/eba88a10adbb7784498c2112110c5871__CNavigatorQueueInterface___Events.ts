// eba88a10adbb7784498c2112110c5871.cct / CNavigatorQueueInterface / _Events

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _Events(_me: LingoMe, a_kEvt: LingoValue, a_sElm: LingoValue, a_vPrm: LingoValue, a_sWnd: LingoValue) {
  callNamed("executeMessage", symbol("ui_Fastpass"))
  switch (a_sElm) {
case "roomqueue.cancel":
  setMeProp(_me, "m_iPeopleInQueue", 0);
  callMethod("hideLoadBar", _me)
  callNamed("executeMessage", "room_remove")
  var t_sCon = callNamed("getVariable", "main.connection.id", "VMK");
  if (callNamed("connectionExists", t_sCon)) {
  callMethod("send", callNamed("getConnection", t_sCon), "CancelRoomQueue")
  }

  callMethod("StopPinging", _me)
  break;
case "nav.fastpass.button":
  var t_rDialog = callNamed("createDialogWindow", callMethod("getID", _me), "ConfirmFastPass", 2, 1);
  callMethod("show", t_rDialog)
  callMethod("setText", t_rDialog, callNamed("getText", "fastpass.confirm.text"), callNamed("getText", "fastpass.get.hd"), callNamed("getText", "nav.sellroom.no"), callNamed("getText", "nav.sellroom.yes"))
  break;
  }

}

