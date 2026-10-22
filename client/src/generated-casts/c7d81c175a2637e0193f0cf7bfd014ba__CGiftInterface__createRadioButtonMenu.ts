// c7d81c175a2637e0193f0cf7bfd014ba.cct / CGiftInterface / createRadioButtonMenu

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createRadioButtonMenu(_me: LingoMe) {
  if (callNamed("objectExists", "GiftMenuButtons")) {
  callNamed("removeObject", "GiftMenuButtons")
  }

  setMeProp(_me, "m_pRadioButtons", callNamed("createObject", "GiftMenuButtons", "CRadioButtonMenu"));
  var t_Names = new LingoList(["gift.template1", "gift.template2", "gift.template3", "gift.template4"]);
  var t_Descriptions = new LingoList([callNamed("getText", "hlp.problem1"), callNamed("getText", "hlp.problem2"), callNamed("getText", "hlp.problem3"), "neljä"]);
  var t_Elements = new LingoList([]);
  var i = 1;
  for (var t_Name of t_Names.toArray()) {
  var t_Elem = new LingoPropList([]);
  t_Elem[symbol("element")] = t_Name;
  t_Elem[symbol("description")] = t_Descriptions[i];
  callMethod("append", t_Elements, t_Elem)
  i = lingoBinary("add", i, 1);
  }

  callMethod("setParentWindow", meProp(_me, "m_pRadioButtons"), callMethod("getID", meProp(_me, "m_rWindow")))
  callMethod("addElements", meProp(_me, "m_pRadioButtons"), t_Elements)
  callMethod("clickElement", meProp(_me, "m_pRadioButtons"), lingoBinary("join", "gift.template", meProp(_me, "m_BgType")))
}

