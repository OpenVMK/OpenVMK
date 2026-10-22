// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskSayWord / merge

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
  var t_bSuccess = callMethod("merge", meProp(_me, "m_rWindow"), "vmk_quest_sayword.window");
  var t_rTitleElem = callMethod("getElement", meProp(_me, "m_rWindow"), "quest.dialog.hd");
  if (lingoBinary("neq", t_rTitleElem, 0)) {
  callMethod("setText", t_rTitleElem, callNamed("getText", "quest.dialog.hd.sayword"))
  }

  var t_ar_fields = new LingoList(["quest.sayword.input"]);
  for (var t_sFieldName of t_ar_fields.toArray()) {
  var t_rCannedField = callNamed("createObject", symbol("random"), "CQuestCannedField");
  callMethod("Init", t_rCannedField, meProp(_me, "m_rWindow"), t_sFieldName)
  callMethod("setWordLimit", t_rCannedField, 4)
  meProp(_me, "m_ar_CannedFields")[t_sFieldName] = t_rCannedField;
  }

  callNamed("createTimeout", "setFocus", 500, symbol("setFocus"), callMethod("getID", _me), undefined, 1)
  return t_bSuccess;
}

