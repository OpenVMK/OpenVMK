// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep3 / merge

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
  var t_bSuccess = callMethod("merge", meProp(_me, "m_rWindow"), "vmk_quest_create_step_3.window");
  callMethod("createRadioButton", _me)
  callMethod("changeImageInElement", _me, meProp(_me, "m_rWindow"), "quest.main.label", callNamed("member", "quest.label.create"))
  callMethod("setButtonState", _me, meProp(_me, "m_rWindow"), "quest.nextstep.button", 0)
  callMethod("setButtonState", _me, meProp(_me, "m_rWindow"), "quest.start.button", 0)
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.main.hd", callNamed("getText", "quest.step3.title"))
  var t_ar_fields = new LingoList(["quest.questname.input", "quest.description.input"]);
  for (var t_sFieldName of t_ar_fields.toArray()) {
  var t_rCannedField = callNamed("createObject", symbol("random"), "CQuestCannedField");
  callMethod("Init", t_rCannedField, meProp(_me, "m_rWindow"), t_sFieldName)
  meProp(_me, "m_ar_CannedFields")[t_sFieldName] = t_rCannedField;
  }

  callNamed("createTimeout", "setFocus", 500, symbol("setFocus"), callMethod("getID", _me), undefined, 1)
  callMethod("hidePageTabs", _me)
  return t_bSuccess;
}

