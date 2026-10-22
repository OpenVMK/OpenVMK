// vmk_casual_checkers.cct / CCheckersSpriteAnimPlayer / SetSprite

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetSprite(_me: LingoMe, _this: LingoValue, a_rSprite: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rSprite"))) ? 0 : 1)) {
  if (meProp(_me, "m_bReleaseSprite")) {
  callNamed("releaseSprite", meProp(_me, "m_rSprite").spriteNum)
  }

  }

  setMeProp(_me, "m_bReleaseSprite", 0);
  setMeProp(_me, "m_rSprite", a_rSprite);
  if ((lingoTruthy(meProp(_me, "m_bPositionSet")) ? 0 : 1)) {
  setMeProp(_me, "m_ptCenter", a_rSprite.loc);
  setMeProp(_me, "m_iLocZ", a_rSprite.locZ);
  }

}

