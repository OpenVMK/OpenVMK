// vmk_shipwreck_handler.cct / CBitmapFont / createFontFromBitmap

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createFontFromBitmap(_me: LingoMe, mbrName: LingoValue) {
  // HAND-CORRECTED: the characters are KEYS, never positions. A bracket subscript
  // reaches the runtime as a JS string, so "1".."9" read/wrote POSITIONS 1..9 of
  // the prop list (the glyph for "1" overwrote A's slot; "1"'s width read #width)
  // and the monorail sign showed "1{PPRO19G" for APPROACHING. Director tells key
  // from position by the subscript's type; getaProp/setaProp say it explicitly.
  var t_fontMem = callNamed("member", callNamed("getmemnum", mbrName));
  var t_BitmapFont = new LingoPropList([]);
  if (lingoBinary("neq", t_fontMem, 0)) {
  if (lingoBinary("neq", meProp(_me, "m_fontConfig"), 0)) {
  var t_fontImage = t_fontMem.image;
  var fontHeight = t_fontImage.height;
  setThePropOf(meProp(_me, "m_fontConfig"), "height", fontHeight);
  var t_offsetX = 0;
  var t_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.:!?";
  for (var i = 1; i <= t_chars.char.count; ++i) {
  var t_char = t_chars.char[i];
  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", meProp(_me, "m_fontConfig"), t_char))) ? 0 : 1)) {
  var t_width = callMethod("getaProp", meProp(_me, "m_fontConfig"), t_char);
  } else {
  t_width = meProp(_me, "m_fontConfig").width;
  }

  var t_bitmapChar = callNamed("image", t_width, fontHeight, 32);
  callMethod("copyPixels", t_bitmapChar, t_fontImage, t_bitmapChar.rect, lingoBinary("add", t_bitmapChar.rect, callNamed("rect", t_offsetX, 0, t_offsetX, 0)))
  callMethod("setaProp", t_BitmapFont, t_char, t_bitmapChar);
  t_offsetX = lingoBinary("add", t_offsetX, t_width);
  }

  }

  }

  return t_BitmapFont;
}

