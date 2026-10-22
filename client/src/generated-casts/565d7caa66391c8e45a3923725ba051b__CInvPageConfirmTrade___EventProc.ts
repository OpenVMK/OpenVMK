// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageConfirmTrade / _EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProc(_me: LingoMe, _this: LingoValue, a_kEvent: LingoValue, a_sElem: LingoValue, a_vParam: LingoValue) {
  switch (a_sElem) {
case "tra.confirm.ok":
  callMethod("send", callNamed("getConnection", "VMK"), 586, new LingoPropList([symbol("int"), 2]))
  callNamed("removeWindow", meProp(_me, "m_sWndID"))
  break;
case "tra.confirm.cancel":
  callMethod("send", callNamed("getConnection", "VMK"), 586, new LingoPropList([symbol("int"), 0]))
  if (callNamed("windowExists", "vmk_tra.window")) {
  callMethod("setProperty", callNamed("getWindow", "vmk_tra.window"), symbol("modal"), 1)
  }

  callNamed("removeWindow", meProp(_me, "m_sWndID"))
  break;
  }

}

