// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CTutorialWindow / setCheckBoxState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setCheckBoxState(_me: LingoMe) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  var t_mem = callNamed("getmemnum", lingoBinary("join", "button.checkbox.", meProp(_me, "m_bTutorialCheckBox")));
  var t_Elem = callMethod("getElement", tWndObj, "tutorial.off");
  if (lingoBinary("neq", t_Elem, 0)) {
  if (lingoBinary("neq", t_mem, 0)) {
  var t_Img = callMethod("duplicate", callNamed("member", t_mem).image);
  callMethod("feedImage", t_Elem, t_Img)
  }

  }

}

