// vmk_pirates_minigame.cct / CCloudVisualizer / deconstruct

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
  callNamed("releaseSprite", meProp(_me, "m_rShadowSprite").spriteNum)
  return 1;
}

