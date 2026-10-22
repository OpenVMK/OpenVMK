// vmk_tutorial.cct / CGameCamera / GetHideables

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetHideables(_me: LingoMe) {
  return new LingoList([meProp(_me, "m_rSprBase").spriteNum, meProp(_me, "m_rSprLock").spriteNum, meProp(_me, "m_rSprLED").spriteNum]);
}

