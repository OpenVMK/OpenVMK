// vmk_shrinking_room_handler.cct / CTextScroller / setText

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setText(_me: LingoMe, i_txt: LingoValue) {
  callMethod("stop", _me)
  setMeProp(_me, "m_sContent", callNamed("convertToHigherCase", i_txt));
  callMethod("start", _me)
}

