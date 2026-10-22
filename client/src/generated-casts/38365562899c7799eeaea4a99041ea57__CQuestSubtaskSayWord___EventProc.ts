// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskSayWord / _EventProc

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
  if (lingoBinary("or", lingoBinary("eq", a_kEvent, symbol("keyUp")), lingoBinary("eq", a_kEvent, symbol("keyDown")))) {
  var t_sCannedFieldName = callMethod("getPropAt", meProp(_me, "m_ar_CannedFields"), 1);
  switch (a_sElemID) {
case t_sCannedFieldName:
  return callMethod("_EventProc", meProp(_me, "m_ar_CannedFields")[1], a_kEvent, a_sElemID, a_vParam);
  }

  }

  if (lingoBinary("eq", a_kEvent, symbol("mouseUp"))) {
  switch (a_sElemID) {
case "mes.accept.button":
  var t_bDataOK = 0;
  var tElement = callMethod("getElement", meProp(_me, "m_rWindow"), "quest.sayword.input");
  if (lingoBinary("neq", tElement, 0)) {
  var t_sText = callMethod("getText", tElement);
  var t_ar_results = new LingoPropList([]);
  if (callMethod("CheckContent", meProp(_me, "m_ar_CannedFields")[1])) {
  if (lingoBinary("lt", t_sText.word.count, 5)) {
  var t_ar_text = callNamed("ParseCannedField", tElement, new LingoList([]));
  t_ar_results[symbol("phrase")] = t_ar_text;
  var t_rManager = callMethod("getManager", _me);
  if (callNamed("objectp", t_rManager)) {
  callMethod("appendSubResult", t_rManager, t_ar_results)
  callMethod("resolveSubtask", t_rManager)
  callMethod("Activate", t_rManager)
  }

  t_bDataOK = 1;
  }

  }

  }

  if ((lingoTruthy(t_bDataOK) ? 0 : 1)) {
  var t_txt = callNamed("getText", "quest.alert.sayword.missing");
  var t_title = callNamed("getText", "quest.alert.title");
  var t_btn1 = callNamed("getText", "quest.alert.ok");
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "quest.alert.sayword", 1, 1);
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
  callNamed("put", lingoBinary("joinPad", "Subtask.SayWord.event:", a_sElemID))
  break;
  break;
  }

  }

}

