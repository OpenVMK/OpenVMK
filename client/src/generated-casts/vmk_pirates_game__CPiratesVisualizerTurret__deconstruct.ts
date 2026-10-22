// vmk_pirates_game.cct / CPiratesVisualizerTurret / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callMethod("releaseSprite", callNamed("getSpriteManager"), meProp(_me, "m_rSprite").spriteNum)
  callMethod("releaseSprite", callNamed("getSpriteManager"), meProp(_me, "m_rFlameSprite").spriteNum)
  return 1;
}

