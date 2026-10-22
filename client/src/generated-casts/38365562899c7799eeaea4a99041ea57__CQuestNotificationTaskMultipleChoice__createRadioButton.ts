// 38365562899c7799eeaea4a99041ea57.cct / CQuestNotificationTaskMultipleChoice / createRadioButton

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createRadioButton(_me: LingoMe, answer_count: LingoValue) {
  if (lingoBinary("gt", answer_count, 0)) {
  setMeProp(_me, "m_rRadioButton", callNamed("createObject", callNamed("getUniqueID"), "CQuestRadioButton"));
  var t_ar_elements = new LingoList([]);
  for (var i = 1; i <= answer_count; ++i) {
  callMethod("append", t_ar_elements, new LingoPropList([symbol("element"), lingoBinary("join", "quest.answer", i), symbol("description"), "", symbol("value"), i]))
  }

  callMethod("addElements", meProp(_me, "m_rRadioButton"), t_ar_elements)
  callMethod("setParentWindow", meProp(_me, "m_rRadioButton"), meProp(_me, "m_rWindow"))
  callMethod("clickElement", meProp(_me, "m_rRadioButton"), "quest.answer1")
  callMethod("updateMenu", meProp(_me, "m_rRadioButton"))
  }

}

