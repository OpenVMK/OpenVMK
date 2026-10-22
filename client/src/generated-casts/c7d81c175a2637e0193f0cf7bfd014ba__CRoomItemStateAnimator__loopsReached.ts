// c7d81c175a2637e0193f0cf7bfd014ba.cct / CRoomItemStateAnimator / loopsReached

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function loopsReached(_me: LingoMe) {
  for (var t_rBlk of meProp(_me, "m_ar_frames").toArray()) {
  for (var t_rSpr of t_rBlk[symbol("sprites")].toArray()) {
  if (lingoBinary("lt", t_rSpr[symbol("loops")], meProp(_me, "m_iLoop"))) {
  return 0;
  }

  }

  }

  return 1;
}

