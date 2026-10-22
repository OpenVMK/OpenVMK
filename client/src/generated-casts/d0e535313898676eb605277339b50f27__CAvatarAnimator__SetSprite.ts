// d0e535313898676eb605277339b50f27.cct / CAvatarAnimator / SetSprite

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetSprite(_me: LingoMe, a_Spr: LingoValue) {
  setMeProp(_me, "m_memAnimator", callNamed("createMember", callNamed("getUniqueID"), symbol("bitmap")));
  if (callNamed("voidp", a_Spr)) {
  if (callNamed("voidp", meProp(_me, "m_rSpr"))) {
  setMeProp(_me, "m_rSpr", callNamed("sprite", callNamed("reserveSprite")));
  }

  setThePropOf(meProp(_me, "m_rSpr"), "member", meProp(_me, "m_memAnimator"));
  setMeProp(_me, "m_bJustImage", 1);
  } else {
  setMeProp(_me, "m_rSpr", a_Spr);
  setThePropOf(meProp(_me, "m_rSpr"), "member", meProp(_me, "m_memAnimator"));
  setMeProp(_me, "m_bJustImage", 0);
  }

}

