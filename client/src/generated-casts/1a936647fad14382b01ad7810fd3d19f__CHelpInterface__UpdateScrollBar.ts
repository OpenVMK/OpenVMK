// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpInterface / UpdateScrollBar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateScrollBar(_me: LingoMe, t_offset: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_windowTitle"));
  if ((lingoTruthy(callNamed("voidp", t_offset)) ? 0 : 1)) {
  var tScrollbar = callMethod("getElement", tWndObj, "hlp.scrollbar1");
  callNamed("call", symbol("setScrollOffset"), tScrollbar, t_offset)
  }

  tScrollbar = callMethod("getElement", tWndObj, "hlp.scrollbar2");
  callNamed("call", symbol("setScrollOffset"), tScrollbar, 0)
}

