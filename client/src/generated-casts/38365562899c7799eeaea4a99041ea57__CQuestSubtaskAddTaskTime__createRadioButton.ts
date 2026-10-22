// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskAddTaskTime / createRadioButton

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
  callMethod("append", t_ar_elements, new LingoPropList([symbol("element"), "quest.tasktime1", symbol("description"), "", symbol("value"), 5]))
  callMethod("append", t_ar_elements, new LingoPropList([symbol("element"), "quest.tasktime2", symbol("description"), "", symbol("value"), 15]))
  callMethod("append", t_ar_elements, new LingoPropList([symbol("element"), "quest.tasktime3", symbol("description"), "", symbol("value"), 30]))
  callMethod("append", t_ar_elements, new LingoPropList([symbol("element"), "quest.tasktime4", symbol("description"), "", symbol("value"), 60]))
  callMethod("append", t_ar_elements, new LingoPropList([symbol("element"), "quest.tasktime5", symbol("description"), "", symbol("value"), 120]))
  callMethod("append", t_ar_elements, new LingoPropList([symbol("element"), "quest.tasktime6", symbol("description"), "", symbol("value"), 300]))
  callMethod("append", t_ar_elements, new LingoPropList([symbol("element"), "quest.tasktime7", symbol("description"), "", symbol("value"), 600]))
  callMethod("append", t_ar_elements, new LingoPropList([symbol("element"), "quest.tasktime8", symbol("description"), "", symbol("value"), 900]))
  callMethod("append", t_ar_elements, new LingoPropList([symbol("element"), "quest.notimelimit", symbol("description"), "", symbol("value"), 0, symbol("type"), symbol("rect")]))
  callMethod("addElements", meProp(_me, "m_rRadioButton"), t_ar_elements)
  callMethod("setParentWindow", meProp(_me, "m_rRadioButton"), meProp(_me, "m_rWindow"))
  callMethod("clickElement", meProp(_me, "m_rRadioButton"), "quest.task.notimelimit")
  callMethod("updateMenu", meProp(_me, "m_rRadioButton"))
}

