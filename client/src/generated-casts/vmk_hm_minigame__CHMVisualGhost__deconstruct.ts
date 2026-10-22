// vmk_hm_minigame.cct / CHMVisualGhost / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("releaseSprite", meProp(_me, "m_rSprite").spriteNum)
  callNamed("releaseSprite", meProp(_me, "m_rGlow").spriteNum)
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rShadowSpr"))) ? 0 : 1)) {
  callNamed("releaseSprite", meProp(_me, "m_rShadowSpr").spriteNum)
  }

  return 1;
}

