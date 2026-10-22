// vmk_pirates2_minigame.cct / CKrakenSeamonsterVisualizer / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  for (var t_rSprite of meProp(_me, "m_ar_sprites").toArray()) {
  setThePropOf(t_rSprite, "member", undefined);
  callMethod("releaseSprite", callNamed("getSpriteManager"), t_rSprite.spriteNum)
  }

  return 1;
}

