// 565d7caa66391c8e45a3923725ba051b.cct / CInvItemDetails / _EventProc

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
case "close":
  if (callNamed("windowExists", meProp(_me, "m_sWndID"))) {
  callNamed("removeWindow", meProp(_me, "m_sWndID"))
  }

  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  callNamed("removeWindow", meProp(_me, "m_sWndID"))
  }

  break;
case "iteminfo.check.guestsmove":
  if (callNamed("windowExists", meProp(_me, "m_sWndID"))) {
  var tNewState = callMethod("toggleCheckBox", _this, callNamed("getWindow", meProp(_me, "m_sWndID")), a_sElem);
  if ((lingoTruthy(callNamed("voidp", tNewState)) ? 0 : 1)) {
  callMethod("send", callNamed("getConnection", "VMK"), "ChangeItemProperties", new LingoPropList([symbol("int"), meProp(_me, "m_mp_props")[symbol("xtra")][symbol("ref")], symbol("int"), tNewState]))
  }

  }

  break;
case "help":
  callNamed("executeMessage", "ui_help")
  break;
  }

}

