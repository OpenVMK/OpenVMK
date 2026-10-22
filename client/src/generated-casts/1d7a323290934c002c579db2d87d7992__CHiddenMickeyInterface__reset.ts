// 1d7a323290934c002c579db2d87d7992.cct / CHiddenMickeyInterface / reset

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function reset(_me: LingoMe) {
  setMeProp(_me, "m_ar_HiddenMickeysInRoom", new LingoList([]));
  setMeProp(_me, "m_lHiddenMickeysInViewFinder", new LingoList([]));
  for (var tMickey of meProp(_me, "m_mpHiddenMickeysInRoom").toArray()) {
  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", tMickey, "SPRITE"))) ? 0 : 1)) {
  callNamed("releaseSprite", tMickey["SPRITE"].spriteNum)
  }

  }

  setMeProp(_me, "m_mpHiddenMickeysInRoom", new LingoPropList([]));
}

