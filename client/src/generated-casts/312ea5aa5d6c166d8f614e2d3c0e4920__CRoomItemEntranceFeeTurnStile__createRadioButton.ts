// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / CRoomItemEntranceFeeTurnStile / createRadioButton

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createRadioButton(_me: LingoMe, t_sWindowID: LingoValue) {
  var t_rWindow = callNamed("getWindow", t_sWindowID);
  if (callNamed("objectp", t_rWindow)) {
  if (callNamed("objectExists", lingoBinary("join", t_sWindowID, "_menu"))) {
  var t_rRadioButton = callNamed("getObject", lingoBinary("join", t_sWindowID, "_menu"));
  } else {
  t_rRadioButton = callNamed("createObject", lingoBinary("join", t_sWindowID, "_menu"), "CQuestRadioButton");
  }

  var t_ar_elements = new LingoList([]);
  callMethod("append", t_ar_elements, new LingoPropList([symbol("element"), "quest.duration1", symbol("description"), "", symbol("value"), meProp(_me, "m_iFee0")]))
  callMethod("append", t_ar_elements, new LingoPropList([symbol("element"), "quest.duration2", symbol("description"), "", symbol("value"), meProp(_me, "m_iFee1")]))
  callMethod("append", t_ar_elements, new LingoPropList([symbol("element"), "quest.duration3", symbol("description"), "", symbol("value"), meProp(_me, "m_iFee2")]))
  callMethod("append", t_ar_elements, new LingoPropList([symbol("element"), "quest.duration4", symbol("description"), "", symbol("value"), meProp(_me, "m_iFee3")]))
  callMethod("addElements", t_rRadioButton, t_ar_elements)
  callMethod("setParentWindow", t_rRadioButton, t_rWindow)
  callMethod("clickElement", t_rRadioButton, "quest.duration1")
  callMethod("updateMenu", t_rRadioButton)
  return t_rRadioButton;
  } else {
  return undefined;
  }

}

