// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CTutorialWindow / updateInterface

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateInterface(_me: LingoMe) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  if (lingoBinary("neq", tWndObj, 0)) {
  var t_Elem = callMethod("getElement", tWndObj, "tutorial.content.text");
  if (lingoBinary("neq", t_Elem, 0)) {
  callMethod("setText", t_Elem, callMethod("getaProp", meProp(_me, "m_pTexts"), symbol("desc")))
  }

  t_Elem = callMethod("getElement", tWndObj, "tutorial.window.title");
  if (lingoBinary("neq", t_Elem, 0)) {
  callMethod("setText", t_Elem, callMethod("getaProp", meProp(_me, "m_pTexts"), symbol("title")))
  }

  if (meProp(_me, "m_bShowMore")) {
  callMethod("setButtonState", _me, "tutorial.more", 1)
  } else {
  callMethod("setButtonState", _me, "tutorial.more", 0)
  }

  callMethod("setCheckBoxState", _me)
  }

}

