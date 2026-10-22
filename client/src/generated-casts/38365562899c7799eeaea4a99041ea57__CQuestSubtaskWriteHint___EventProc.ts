// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskWriteHint / _EventProc

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
case "quest.removehint.button":
  setMeProp(_me, "m_iCurrentID", -float(1));
  callMethod("reDraw", _me)
  break;
case "quest.addphoto.button":
  if (lingoBinary("neq", callNamed("getObject", "QuestDialogManagerAddPhoto"), 0)) {
  callNamed("removeObject", "QuestDialogManagerAddPhoto")
  }

  var t = callNamed("createObject", "QuestDialogManagerAddPhoto", "CQuestWindowManager");
  callMethod("SetType", callMethod("getInterface", t), "dialog")
  callMethod("SetOwner", t, _me)
  callMethod("populate", t, new LingoList(["selectphoto"]))
  callMethod("Activate", t)
  break;
case "mes.accept.button":
  var tElement = callMethod("getElement", meProp(_me, "m_rWindow"), "quest.taskhint.input");
  var t_sText = callMethod("getText", tElement);
  var t_bError = 0;
  if (lingoBinary("and", lingoBinary("eq", t_sText.length, 0), lingoBinary("eq", meProp(_me, "m_iCurrentID"), -float(1)))) {
  var t_txt = callNamed("getText", "quest.alert.hint.missing");
  var t_title = callNamed("getText", "quest.alert.title");
  var t_btn1 = callNamed("getText", "quest.alert.ok");
  t = callNamed("createDialogWindow", callMethod("getID", _me), "quest.alert.hint", 1, 1);
  callMethod("setText", t, t_txt, t_title, t_btn1)
  callMethod("show", t)
  t_bError = 1;
  }

  if ((lingoTruthy(t_bError) ? 0 : 1)) {
  if ((lingoTruthy(callMethod("CheckContent", meProp(_me, "m_ar_CannedFields")[1])) ? 0 : 1)) {
  t_txt = callNamed("getText", "quest.alert.hint.illegal");
  t_title = callNamed("getText", "quest.alert.title");
  t_btn1 = callNamed("getText", "quest.alert.ok");
  t = callNamed("createDialogWindow", callMethod("getID", _me), "quest.alert.hint.illegal", 1, 1);
  callMethod("setText", t, t_txt, t_title, t_btn1)
  callMethod("show", t)
  t_bError = 1;
  }

  }

  var t_ar_results = new LingoPropList([]);
  if ((lingoTruthy(t_bError) ? 0 : 1)) {
  var t_ar_text = callNamed("ParseCannedField", tElement, new LingoList([]));
  t_ar_results[symbol("hint")] = t_ar_text;
  t_ar_results[symbol("photo")] = meProp(_me, "m_iCurrentID");
  var t_rManager = callMethod("getManager", _me);
  if (callNamed("objectp", t_rManager)) {
  callMethod("appendSubResult", t_rManager, t_ar_results)
  callMethod("resolveSubtask", t_rManager)
  callMethod("Activate", t_rManager)
  }

  }

  break;
case "close":
case "quest.quit":
case "mes.deny.button":
  t_rManager = callMethod("getManager", _me);
  if (callNamed("objectp", t_rManager)) {
  callMethod("cancelSubtask", t_rManager)
  callMethod("Activate", t_rManager)
  }

  break;
case "help":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callNamed("executeMessage", symbol("open_help_page"), callNamed("getText", "help.quest.writehint", callNamed("getText", "help.quest", "help.quest")), 1)
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Subtask.WriteHint.event:", a_sElemID))
  break;
  break;
  }

  }

}

