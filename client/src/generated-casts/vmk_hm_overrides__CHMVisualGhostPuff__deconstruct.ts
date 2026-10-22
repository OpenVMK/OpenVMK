// vmk_hm_overrides.cct / CHMVisualGhostPuff / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if ((lingoTruthy(callNamed("voidp", _me.m_rSprite)) ? 0 : 1)) {
  callNamed("releaseSprite", _me.m_rSprite.spriteNum)
  callNamed("releaseSprite", _me.m_rGlow.spriteNum)
  if ((lingoTruthy(callNamed("voidp", _me.m_rShadowSpr)) ? 0 : 1)) {
  callNamed("releaseSprite", _me.m_rShadowSpr.spriteNum)
  }

  }

  return 1;
}

