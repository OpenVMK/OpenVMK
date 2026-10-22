// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskWriteQuestion / merge

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
  var t_bSuccess = callMethod("merge", meProp(_me, "m_rWindow"), "vmk_quest_multichoice_write.window");
  var t_rTitleElem = callMethod("getElement", meProp(_me, "m_rWindow"), "quest.dialog.hd");
  if (lingoBinary("neq", t_rTitleElem, 0)) {
  callMethod("setText", t_rTitleElem, callNamed("getText", "quest.dialog.hd.writequestion"))
  }

  var t_ar_fields = new LingoList(["quest.taskhint.input"]);
  for (var t_sFieldName of t_ar_fields.toArray()) {
  var t_rCannedField = callNamed("createObject", symbol("random"), "CQuestCannedField");
  callMethod("Init", t_rCannedField, meProp(_me, "m_rWindow"), t_sFieldName)
  meProp(_me, "m_ar_CannedFields")[t_sFieldName] = t_rCannedField;
  }

  var t_rManager = callMethod("getManager", _me);
  if (callNamed("objectp", t_rManager)) {
  var t_ar_results = callMethod("getResults", t_rManager);
  if (callNamed("listp", t_ar_results[symbol("hint")])) {
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.taskhint.input", callNamed("TransformCannedToString", t_ar_results[symbol("hint")]))
  } else {
  if (callNamed("stringp", t_ar_results[symbol("hint")])) {
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.taskhint.input", t_ar_results[symbol("hint")])
  }

  }

  if (callNamed("integerp", t_ar_results[symbol("photo")])) {
  setMeProp(_me, "m_iCurrentID", t_ar_results[symbol("photo")]);
  }

  }

  callMethod("reDraw", _me)
  callNamed("updateStage")
  callNamed("createTimeout", "setFocus", 500, symbol("setFocus"), callMethod("getID", _me), undefined, 1)
  return t_bSuccess;
}

