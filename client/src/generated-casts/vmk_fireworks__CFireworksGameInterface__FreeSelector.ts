// vmk_fireworks.cct / CFireworksGameInterface / FreeSelector

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function FreeSelector(_me: LingoMe) {
  for (var tSelection of meProp(_me, "m_ar_mp_selector").toArray()) {
  if ((lingoTruthy(callNamed("voidp", tSelection)) ? 0 : 1)) {
  if (lingoBinary("neq", tSelection, 0)) {
  callNamed("releaseSprite", tSelection.sprite.spriteNum)
  }

  }

  }

  setMeProp(_me, "m_ar_mp_selector", new LingoList([]));
}

