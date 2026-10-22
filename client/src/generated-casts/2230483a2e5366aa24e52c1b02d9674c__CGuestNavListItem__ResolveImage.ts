// 2230483a2e5366aa24e52c1b02d9674c.cct / CGuestNavListItem / ResolveImage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ResolveImage(_me: LingoMe) {
  setThePropOf(_me, "m_bSpecial", 0);
  if (_me.m_bState) {
  setThePropOf(_me, "m_ImgBg", callNamed("getMember", "field.nav.selected"));
  }

  setThePropOf(_me, "m_ImgBg", callNamed("getMember", "field.nav.active"));
}

