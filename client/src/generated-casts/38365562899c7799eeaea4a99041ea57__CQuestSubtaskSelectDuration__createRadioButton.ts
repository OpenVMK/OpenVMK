// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskSelectDuration / createRadioButton

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
  callMethod("append", t_ar_elements, new LingoPropList([symbol("element"), "quest.duration1", symbol("description"), "", symbol("value"), 60]))
  callMethod("append", t_ar_elements, new LingoPropList([symbol("element"), "quest.duration2", symbol("description"), "", symbol("value"), lingoBinary("mul", 60, 15)]))
  callMethod("append", t_ar_elements, new LingoPropList([symbol("element"), "quest.duration3", symbol("description"), "", symbol("value"), lingoBinary("mul", 60, 30)]))
  callMethod("append", t_ar_elements, new LingoPropList([symbol("element"), "quest.duration4", symbol("description"), "", symbol("value"), lingoBinary("mul", 60, 60)]))
  callMethod("append", t_ar_elements, new LingoPropList([symbol("element"), "quest.duration5", symbol("description"), "", symbol("value"), lingoBinary("mul", lingoBinary("mul", 60, 60), 2)]))
  callMethod("append", t_ar_elements, new LingoPropList([symbol("element"), "quest.duration6", symbol("description"), "", symbol("value"), lingoBinary("mul", lingoBinary("mul", 60, 60), 3)]))
  callMethod("append", t_ar_elements, new LingoPropList([symbol("element"), "quest.duration7", symbol("description"), "", symbol("value"), lingoBinary("mul", lingoBinary("mul", 60, 60), 8)]))
  callMethod("append", t_ar_elements, new LingoPropList([symbol("element"), "quest.duration8", symbol("description"), "", symbol("value"), lingoBinary("mul", lingoBinary("mul", 60, 60), 16)]))
  callMethod("addElements", meProp(_me, "m_rRadioButton"), t_ar_elements)
  callMethod("setParentWindow", meProp(_me, "m_rRadioButton"), meProp(_me, "m_rWindow"))
  callMethod("clickElement", meProp(_me, "m_rRadioButton"), "quest.duration1")
  callMethod("updateMenu", meProp(_me, "m_rRadioButton"))
}

