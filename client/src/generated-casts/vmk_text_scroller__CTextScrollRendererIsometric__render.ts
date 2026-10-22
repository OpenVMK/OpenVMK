// vmk_text_scroller.cct / CTextScrollRendererIsometric / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe, t_sText: LingoValue) {
  callMethod("updateDisplay", _me, t_sText)
  var tObject = callMethod("get", callNamed("getObjectManager"), meProp(_me, "m_sClientID"));
  if (callMethod("passEvent", _me, tObject)) {
  callNamed("call", symbol("scrollerUpdate"), tObject, meProp(_me, "m_pImage"))
  }

}

