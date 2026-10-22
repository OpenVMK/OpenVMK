// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskMultipleChoice / createRadioButton

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createRadioButton(_me: LingoMe) {
  setMeProp(_me, "m_rRadioButton", callNamed("createObject", callNamed("getUniqueID"), "CQuestRadioButton"));
  var t_ar_elements = new LingoList([]);
  callMethod("append", t_ar_elements, new LingoPropList([symbol("element"), "quest.answer1", symbol("description"), "", symbol("value"), 1]))
  callMethod("append", t_ar_elements, new LingoPropList([symbol("element"), "quest.answer2", symbol("description"), "", symbol("value"), 2]))
  callMethod("append", t_ar_elements, new LingoPropList([symbol("element"), "quest.answer3", symbol("description"), "", symbol("value"), 3]))
  callMethod("append", t_ar_elements, new LingoPropList([symbol("element"), "quest.answer4", symbol("description"), "", symbol("value"), 4]))
  callMethod("append", t_ar_elements, new LingoPropList([symbol("element"), "quest.answer5", symbol("description"), "", symbol("value"), 5]))
  callMethod("addElements", meProp(_me, "m_rRadioButton"), t_ar_elements)
  callMethod("setParentWindow", meProp(_me, "m_rRadioButton"), meProp(_me, "m_rWindow"))
  callMethod("clickElement", meProp(_me, "m_rRadioButton"), "quest.answer1")
  callMethod("updateMenu", meProp(_me, "m_rRadioButton"))
}

