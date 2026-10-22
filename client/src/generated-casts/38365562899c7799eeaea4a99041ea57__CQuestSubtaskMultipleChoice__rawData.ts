// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskMultipleChoice / rawData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function rawData(_me: LingoMe, t_ar_data: LingoValue) {
  callNamed("put", lingoBinary("joinPad", "Update task: Multiple Choice", t_ar_data))
  if (callNamed("listp", t_ar_data[symbol("answers")])) {
  for (var i = 1; i <= t_ar_data[symbol("answers")].count; ++i) {
  var t_rAnswer = t_ar_data[symbol("answers")][i];
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

  var t_iCorrectAnswerID = t_ar_data[symbol("correctAnswerID")];
  if (callNamed("integerp", t_iCorrectAnswerID)) {
  callMethod("clickElement", meProp(_me, "m_rRadioButton"), lingoBinary("join", "quest.answer", t_iCorrectAnswerID))
  callMethod("updateMenu", meProp(_me, "m_rRadioButton"))
  }

  var t_rManager = callMethod("getManager", _me);
  if (callNamed("objectp", t_rManager)) {
  var t_ar_results = new LingoPropList([]);
  t_ar_results[symbol("taskType")] = t_ar_data[symbol("taskType")];
  callMethod("appendSubResult", t_rManager, t_ar_results)
  }

}

