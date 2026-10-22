// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskEarnCredits / _EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProc(_me: LingoMe, a_kEvent: LingoValue, a_sElemID: LingoValue, a_vParam: LingoValue) {
  var tWndObj = meProp(_me, "m_rWindow");
  if (lingoBinary("eq", a_kEvent, symbol("mouseDown"))) {
  switch (a_sElemID) {
case "quest.credits.up":
  setMeProp(_me, "m_iCreditsState", symbol("toprize"));
  callNamed("createTimeout", "updateAmount", 100, symbol("updateAmount"), callMethod("getID", _me), undefined, undefined)
  break;
case "quest.credits.down":
  setMeProp(_me, "m_iCreditsState", symbol("fromprize"));
  callNamed("createTimeout", "updateAmount", 100, symbol("updateAmount"), callMethod("getID", _me), undefined, undefined)
  break;
  }

  } else {
  if (lingoBinary("eq", a_kEvent, symbol("mouseUp"))) {
  setMeProp(_me, "m_iCreditsState", symbol("inactive"));
  if (callNamed("timeoutExists", "updateAmount")) {
  callNamed("removeTimeout", "updateAmount")
  }

  switch (a_sElemID) {
case "mes.accept.button":
  if (lingoBinary("gt", meProp(_me, "m_iCurrentAmount"), 0)) {
  var t_ar_results = new LingoPropList([symbol("amount"), meProp(_me, "m_iCurrentAmount")]);
  var t_rManager = callMethod("getManager", _me);
  if (callNamed("objectp", t_rManager)) {
  callMethod("appendSubResult", t_rManager, t_ar_results)
  callMethod("resolveSubtask", t_rManager)
  callMethod("Activate", t_rManager)
  }

  } else {
  var t_txt = callNamed("getText", "quest.alert.earncredits.text");
  var t_title = callNamed("getText", "quest.alert.title");
  var t_btn1 = callNamed("getText", "quest.alert.ok");
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "quest.alert.earncredits", 1, 1);
  callMethod("setText", t, t_txt, t_title, t_btn1)
  callMethod("show", t)
  }

  break;
case "quest.quit":
case "close":
case "mes.deny.button":
  t_rManager = callMethod("getManager", _me);
  if (callNamed("objectp", t_rManager)) {
  callMethod("cancelSubtask", t_rManager)
  callMethod("Activate", t_rManager)
  }

  break;
case "help":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callNamed("executeMessage", symbol("open_help_page"), callNamed("getText", "help.quest.addtask", callNamed("getText", "help.quest", "help.quest")), 1)
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Subtask.EarnCredits.event:", a_sElemID))
  break;
  break;
  }

  }

  }

}

