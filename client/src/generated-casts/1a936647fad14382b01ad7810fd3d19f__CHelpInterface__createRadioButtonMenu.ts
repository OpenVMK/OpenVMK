// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpInterface / createRadioButtonMenu

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createRadioButtonMenu(_me: LingoMe) {
  setMeProp(_me, "m_pRadioButtons", callNamed("createObject", "Help Radio Button Menu", "CRadioButtonMenu"));
  var t_Names = new LingoList(["hlp.problem1.button", "hlp.problem2.button", "hlp.problem3.button"]);
  var t_Descriptions = new LingoList([callNamed("getText", "hlp.problem1"), callNamed("getText", "hlp.problem2"), callNamed("getText", "hlp.problem3")]);
  var t_Elements = new LingoList([]);
  var i = 1;
  for (var t_Name of t_Names.toArray()) {
  var t_Elem = new LingoPropList([]);
  t_Elem[symbol("element")] = t_Name;
  t_Elem[symbol("description")] = t_Descriptions[i];
  callMethod("append", t_Elements, t_Elem)
  i = lingoBinary("add", i, 1);
  }

  callMethod("setParentWindow", meProp(_me, "m_pRadioButtons"), meProp(_me, "m_windowTitle"))
  callMethod("addElements", meProp(_me, "m_pRadioButtons"), t_Elements)
}

