// vmk_shrinking_room_handler.cct / CTextScroller / pause

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function pause(_me: LingoMe) {
  setMeProp(_me, "m_bActive", 0);
  callNamed("removeTimeout", lingoBinary("join", symbol("textscroller_update"), callMethod("getID", _me)))
}

