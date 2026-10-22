// d0e535313898676eb605277339b50f27.cct / CAvatarAnimatorRenderer / setAnimation

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setAnimation(_me: LingoMe, a_sAnim: LingoValue) {
  if (lingoBinary("neq", meProp(_me, "m_sAnimation"), a_sAnim)) {
  setMeProp(_me, "m_sAnimation", a_sAnim);
  }

}

