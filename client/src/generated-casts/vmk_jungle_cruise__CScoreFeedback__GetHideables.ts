// vmk_jungle_cruise.cct / CScoreFeedback / GetHideables

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetHideables(_me: LingoMe) {
  return new LingoList([meProp(_me, "m_rSprite").spriteNum]);
}

