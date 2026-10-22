// vmk_pirates2_minigame.cct / CFloatingTextFactory / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("removeWriter", "PiratesFloatWriter")
  for (var tSpr of meProp(_me, "m_ar_rSprFloats").toArray()) {
  callNamed("removeMember", tSpr.member.name)
  callNamed("releaseSprite", tSpr.spriteNum)
  }

  return 1;
}

