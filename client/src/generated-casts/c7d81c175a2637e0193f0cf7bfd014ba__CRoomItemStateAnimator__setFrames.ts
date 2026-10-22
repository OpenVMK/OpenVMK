// c7d81c175a2637e0193f0cf7bfd014ba.cct / CRoomItemStateAnimator / setFrames

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setFrames(_me: LingoMe, t_ar_frames: LingoValue) {
  if (callNamed("listp", t_ar_frames)) {
  setMeProp(_me, "m_ar_frames", t_ar_frames);
  }

}

