// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskMultipleChoice / merge

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function merge(_me: LingoMe, a_rWindow: LingoValue) {
  setMeProp(_me, "m_rWindow", a_rWindow);
  var t_bSuccess = callMethod("merge", meProp(_me, "m_rWindow"), "vmk_quest_multichoice.window");
  var t_rTitleElem = callMethod("getElement", meProp(_me, "m_rWindow"), "quest.dialog.hd");
  if (lingoBinary("neq", t_rTitleElem, 0)) {
  callMethod("setText", t_rTitleElem, callNamed("getText", "quest.dialog.hd.multichoice"))
  }

  var t_ar_fields = new LingoList(["quest.answer.input1", "quest.answer.input2", "quest.answer.input3", "quest.answer.input4", "quest.answer.input5"]);
  for (var t_sFieldName of t_ar_fields.toArray()) {
  var t_rCannedField = callNamed("createObject", symbol("random"), "CQuestCannedField");
  callMethod("Init", t_rCannedField, meProp(_me, "m_rWindow"), t_sFieldName, 1)
  callMethod("setWordLimit", t_rCannedField, 4)
  meProp(_me, "m_ar_CannedFields")[t_sFieldName] = t_rCannedField;
  }

  callMethod("registerProcedure", a_rWindow, symbol("_EventProc"), callMethod("getID", _me), symbol("keyDown"))
  callMethod("registerProcedure", a_rWindow, symbol("_EventProc"), callMethod("getID", _me), symbol("keyUp"))
  callNamed("createTimeout", "setFocus", 500, symbol("setFocus"), callMethod("getID", _me), undefined, 1)
  callMethod("createRadioButton", _me)
  var t_rManager = callMethod("getManager", _me);
  if (callNamed("objectp", t_rManager)) {
  var t_ar_results = callMethod("getResults", t_rManager);
  if (callNamed("listp", t_ar_results[symbol("answers")])) {
  for (var i = 1; i <= t_ar_results[symbol("answers")].count; ++i) {
  var t_rAnswer = t_ar_results[symbol("answers")][i];
  var t_sAnswer = "";
  if (callNamed("listp", t_rAnswer)) {
  t_sAnswer = callNamed("TransformCannedToString", t_rAnswer);
  } else {
  if (callNamed("stringp", t_rAnswer)) {
  t_sAnswer = t_rAnswer;
  }

  }

  callMethod("setField", _me, meProp(_me, "m_rWindow"), lingoBinary("join", "quest.answer.input", i), t_sAnswer)
  }

  }

  var t_iCorrectAnswerID = t_ar_results[symbol("correctAnswerID")];
  if (callNamed("integerp", t_iCorrectAnswerID)) {
  callMethod("clickElement", meProp(_me, "m_rRadioButton"), lingoBinary("join", "quest.answer", t_iCorrectAnswerID))
  callMethod("updateMenu", meProp(_me, "m_rRadioButton"))
  }

  }

  return t_bSuccess;
}

