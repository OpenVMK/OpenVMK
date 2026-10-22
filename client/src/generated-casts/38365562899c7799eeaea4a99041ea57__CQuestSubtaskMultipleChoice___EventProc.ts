// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskMultipleChoice / _EventProc

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
  var t_rManager = callMethod("getManager", _me);
  var t_rOwner = callMethod("GetOwner", t_rManager);
  if (lingoBinary("or", lingoBinary("eq", a_kEvent, symbol("keyUp")), lingoBinary("eq", a_kEvent, symbol("keyDown")))) {
  switch (a_sElemID) {
case "quest.answer.input1":
case "quest.answer.input2":
case "quest.answer.input3":
case "quest.answer.input4":
case "quest.answer.input5":
  return callMethod("_EventProc", meProp(_me, "m_ar_CannedFields")[a_sElemID], a_kEvent, a_sElemID, a_vParam);
  break;
  break;
  break;
  break;
  }

  }

  if (lingoBinary("eq", a_kEvent, symbol("mouseUp"))) {
  switch (a_sElemID) {
case "mes.accept.button":
  var t_bDataOK = callMethod("saveData", _me);
  if (t_bDataOK) {
  callMethod("resolveSubtask", t_rManager)
  callMethod("Activate", t_rManager)
  } else {
  var t_txt = callNamed("getText", "quest.alert.multichoice.missing");
  var t_title = callNamed("getText", "quest.alert.title");
  var t_btn1 = callNamed("getText", "quest.alert.ok");
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "quest.alert.multichoice", 1, 1);
  callMethod("setText", t, t_txt, t_title, t_btn1)
  callMethod("show", t)
  }

  break;
case "quest.answer1":
case "quest.answer2":
case "quest.answer3":
case "quest.answer4":
case "quest.answer5":
  callMethod("clickElement", meProp(_me, "m_rRadioButton"), a_sElemID)
  callMethod("updateMenu", meProp(_me, "m_rRadioButton"))
  break;
case "mes.deny.button":
  callMethod("saveData", _me, 1)
  t_rManager = callMethod("getManager", _me);
  if (callNamed("objectp", t_rManager)) {
  callMethod("cancelSubtask", t_rManager)
  callMethod("Activate", t_rManager)
  }

  break;
case "quest.quit":
case "close":
  callMethod("saveData", _me, 1)
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
  break;
  break;
  break;
  }

  }

}

