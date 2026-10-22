// vmk_text_scroller.cct / CBitmapFont / getChar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getChar(_me: LingoMe, t_char: LingoValue) {
  // HAND-CORRECTED: the characters are KEYS, never positions. A bracket subscript
  // reaches the runtime as a JS string, so "1".."9" read/wrote POSITIONS 1..9 of
  // the prop list (the glyph for "1" overwrote A's slot; "1"'s width read #width)
  // and the monorail sign showed "1{PPRO19G" for APPROACHING. Director tells key
  // from position by the subscript's type; getaProp/setaProp say it explicitly.
  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", meProp(_me, "m_BitmapFont"), t_char))) ? 0 : 1)) {
  return callMethod("getaProp", meProp(_me, "m_BitmapFont"), t_char);
  }

  return meProp(_me, "m_Blank");
}

