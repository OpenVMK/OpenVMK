// c7d81c175a2637e0193f0cf7bfd014ba.cct / CRoomItemStateAnimator / setDelay

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setDelay(_me: LingoMe, t_iDelay: LingoValue) {
  if (callNamed("integerp", t_iDelay)) {
  setMeProp(_me, "m_iMaxDelay", t_iDelay);
  }

}

