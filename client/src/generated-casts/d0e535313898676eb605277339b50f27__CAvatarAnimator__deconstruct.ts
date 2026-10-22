// d0e535313898676eb605277339b50f27.cct / CAvatarAnimator / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rSpr"))) ? 0 : 1)) {
  callNamed("releaseSprite", meProp(_me, "m_rSpr").spriteNum)
  }

}

