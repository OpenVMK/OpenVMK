// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep3 / createRadioButton

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
  var t_ar_data = new LingoList([]);
  callMethod("append", t_ar_data, new LingoPropList([symbol("element"), "quest.type1.button", symbol("description"), "", symbol("value"), 0]))
  callMethod("append", t_ar_data, new LingoPropList([symbol("element"), "quest.type2.button", symbol("description"), "", symbol("value"), 1]))
  callMethod("addElements", meProp(_me, "m_rRadioButton"), t_ar_data)
  callMethod("setParentWindow", meProp(_me, "m_rRadioButton"), meProp(_me, "m_rWindow"))
  callMethod("clickElement", meProp(_me, "m_rRadioButton"), "quest.type1.button")
  callMethod("updateMenu", meProp(_me, "m_rRadioButton"))
}

