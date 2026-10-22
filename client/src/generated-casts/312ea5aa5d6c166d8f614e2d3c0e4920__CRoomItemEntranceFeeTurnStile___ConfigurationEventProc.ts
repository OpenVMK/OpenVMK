// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / CRoomItemEntranceFeeTurnStile / _ConfigurationEventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ConfigurationEventProc(_me: LingoMe, a_kEvent: LingoValue, a_sElemID: LingoValue, a_vParam: LingoValue) {
  var tWndObj = callNamed("getWindow", "vmk_turnstile_price");
  var t_rRadioButton = callNamed("getObject", "vmk_turnstile_price_menu");
  if (lingoBinary("eq", a_kEvent, symbol("mouseUp"))) {
  switch (a_sElemID) {
case "quest.duration1":
case "quest.duration2":
case "quest.duration3":
case "quest.duration4":
  if (callNamed("objectp", t_rRadioButton)) {
  callMethod("clickElement", t_rRadioButton, a_sElemID)
  callMethod("updateMenu", t_rRadioButton)
  }

  break;
case "turnstile.collect.button":
  callMethod("send", callNamed("getConnection", "VMK"), "ConfigureItem", new LingoPropList([symbol("int"), meProp(_me, "m_iRef"), symbol("int"), 1, symbol("str"), "credits", symbol("str"), callNamed("string", meProp(_me, "m_iCollectableCredits"))]))
  setMeProp(_me, "m_iCollectableCredits", 0);
  var t_txt = callNamed("getText", "turnstile.credits.amount");
  t_txt = callNamed("replaceChunks", t_txt, "%credits%", meProp(_me, "m_iCollectableCredits"));
  var t_rElem = callMethod("getElement", tWndObj, "turnstile.collect.info");
  if (callNamed("objectp", t_rElem)) {
  callMethod("setText", t_rElem, t_txt)
  }

  t_rElem = callMethod("getElement", tWndObj, "turnstile.collect.button");
  if (callNamed("objectp", t_rElem)) {
  callMethod("deactivate", t_rElem)
  }

  break;
case "close":
case "basic.dialog.button1":
  if (callNamed("objectp", tWndObj)) {
  callNamed("removeWindow", callMethod("getID", tWndObj))
  }

  if (callNamed("objectp", t_rRadioButton)) {
  callNamed("removeObject", callMethod("getID", t_rRadioButton))
  }

  break;
case "basic.dialog.button2":
  var t_iFee = callNamed("string", callMethod("getValue", t_rRadioButton));
  callMethod("send", callNamed("getConnection", "VMK"), "ConfigureItem", new LingoPropList([symbol("int"), meProp(_me, "m_iRef"), symbol("int"), 1, symbol("str"), "fee", symbol("str"), t_iFee]))
  if (callNamed("objectp", tWndObj)) {
  callNamed("removeWindow", callMethod("getID", tWndObj))
  }

  if (callNamed("objectp", t_rRadioButton)) {
  callNamed("removeObject", callMethod("getID", t_rRadioButton))
  }

  break;
case "help":
  callNamed("executeMessage", symbol("open_help_page"), "help.stuff.turnstile", 1)
  break;
  break;
  break;
  break;
  break;
  }

  }

}

