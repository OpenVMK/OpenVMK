// vmk_tutorial.cct / CGuideCharacter / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("removeMember", callNamed("getMember", "NedsText").memberNum)
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_writerSprite"))) ? 0 : 1)) {
  callNamed("releaseSprite", meProp(_me, "m_writerSprite").spriteNum)
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_charSprite"))) ? 0 : 1)) {
  callNamed("releaseSprite", meProp(_me, "m_charSprite").spriteNum)
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_barSprite"))) ? 0 : 1)) {
  callNamed("releaseSprite", meProp(_me, "m_barSprite").spriteNum)
  }

  callNamed("removeUpdate", callMethod("getID", _me))
  setMeProp(_me, "m_bGuideVisible", 0);
  return 1;
}

