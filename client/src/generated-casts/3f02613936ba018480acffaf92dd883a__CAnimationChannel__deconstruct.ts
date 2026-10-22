// 3f02613936ba018480acffaf92dd883a.cct / CAnimationChannel / deconstruct

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
  for (var tSprite of meProp(_me, "m_ar_sprites").toArray()) {
  callNamed("removeObject", callMethod("getID", tSprite))
  }

  return 1;
}

