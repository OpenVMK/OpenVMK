// vmk_text_scroller.cct / CTextScroller / advance

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function advance(_me: LingoMe, t_char: LingoValue) {
  if (lingoBinary("gt", t_char.length, 1)) {
  t_char = t_char.char[1];
  }

  callMethod("deleteAt", meProp(_me, "m_ViewQueue"), 1)
  callMethod("append", meProp(_me, "m_ViewQueue"), t_char)
}

