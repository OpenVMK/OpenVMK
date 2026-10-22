// vmk_tutorial.cct / CGuideCharacter / GetHideables

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetHideables(_me: LingoMe) {
  if (meProp(_me, "m_bGuideVisible")) {
  return new LingoList([meProp(_me, "m_writerSprite").spriteNum, meProp(_me, "m_charSprite").spriteNum, meProp(_me, "m_barSprite").spriteNum]);
  } else {
  return new LingoList([]);
  }

}

