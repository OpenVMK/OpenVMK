// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskMultipleChoice / saveData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function saveData(_me: LingoMe, a_bDiscardErrors: LingoValue) {
  var t_rManager = callMethod("getManager", _me);
  var t_rOwner = callMethod("GetOwner", t_rManager);
  var t_ar_fields = new LingoList(["quest.answer.input1", "quest.answer.input2", "quest.answer.input3", "quest.answer.input4", "quest.answer.input5"]);
  var t_iChosenAnswer = callMethod("getValue", meProp(_me, "m_rRadioButton"));
  var t_Elem = callMethod("getElement", meProp(_me, "m_rWindow"), t_ar_fields[t_iChosenAnswer]);
  if (lingoBinary("eq", callMethod("getText", t_Elem).length, 0)) {
  callNamed("put", lingoBinary("joinPad", "Multiple Choice - Chosen Answer is Empty", t_iChosenAnswer))
  return 0;
  }

  var t_iLastAnswer = 0;
  for (var t_sFieldName of t_ar_fields.toArray()) {
  t_Elem = callMethod("getElement", meProp(_me, "m_rWindow"), t_sFieldName);
  if (lingoBinary("gt", callMethod("getText", t_Elem).length, 0)) {
  t_iLastAnswer = lingoBinary("add", t_iLastAnswer, 1);
  continue;
  }

  break;
  }

  if (lingoBinary("lt", t_iLastAnswer, 2)) {
  callNamed("put", "Not enough answers, 2 required!!")
  return 0;
  }

  var t_iContentOK = 0;
  for (var t_rCannedField of meProp(_me, "m_ar_CannedFields").toArray()) {
  t_iContentOK = lingoBinary("add", t_iContentOK, callMethod("CheckContent", t_rCannedField));
  }

  if (lingoBinary("lt", t_iContentOK, t_iLastAnswer)) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "Multiple Choice - Field Contain unallowed content", t_iContentOK), meProp(_me, "m_ar_CannedFields").count), t_iLastAnswer))
  return 0;
  }

  var t_ar_answers = new LingoList([]);
  for (var i = 1; i <= t_iLastAnswer; ++i) {
  var tElement = callMethod("getElement", meProp(_me, "m_rWindow"), t_ar_fields[i]);
  callMethod("append", t_ar_answers, callNamed("ParseCannedField", tElement, new LingoList([])))
  }

  if (lingoBinary("lt", t_ar_answers.count, 2)) {
  return 0;
  }

  if (callNamed("objectp", t_rManager)) {
  var t_ar_results = new LingoPropList([]);
  t_ar_results[symbol("correctAnswerID")] = t_iChosenAnswer;
  t_ar_results[symbol("answers")] = t_ar_answers;
  callMethod("appendSubResult", t_rManager, t_ar_results)
  return 1;
  }

  return 0;
}

