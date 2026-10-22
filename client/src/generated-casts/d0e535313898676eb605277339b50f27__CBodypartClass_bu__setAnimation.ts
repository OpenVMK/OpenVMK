// d0e535313898676eb605277339b50f27.cct / CBodypartClass_bu / setAnimation

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setAnimation(_me: LingoMe, tPart: LingoValue, tAnim: LingoValue) {
  if (lingoBinary("neq", tPart, meProp(_me, "m_sPart"))) {
  return;
  }

  setMeProp(_me, "m_bAnimation", callNamed("value", tAnim));
  setMeProp(_me, "m_iTotalFrame", meProp(_me, "m_bAnimation")[1].count);
  setMeProp(_me, "m_iAnimFrame", 1);
}

