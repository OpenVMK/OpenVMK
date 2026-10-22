// vmk_hm_minigame.cct / CHMVisualPlayerObject / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if (lingoBinary("neq", meProp(_me, "m_rSprite").spriteNum, 0)) {
  callNamed("releaseSprite", meProp(_me, "m_rSprite").spriteNum)
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rStatus"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rStatus")))
  }

  if (callNamed("objectp", meProp(_me, "m_rHMRenderer"))) {
  }

  return 1;
}

