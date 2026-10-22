// vmk_text_scroller.cct / CTextScroller / stop

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function stop(_me: LingoMe) {
  setMeProp(_me, "m_bActive", 0);
  setMeProp(_me, "m_Index", 1);
  callNamed("removeTimeout", lingoBinary("join", symbol("textscroller_update"), callMethod("getID", _me)))
}

