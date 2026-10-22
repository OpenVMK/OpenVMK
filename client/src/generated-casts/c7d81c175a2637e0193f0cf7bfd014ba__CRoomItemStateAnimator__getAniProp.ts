// c7d81c175a2637e0193f0cf7bfd014ba.cct / CRoomItemStateAnimator / getAniProp

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getAniProp(_me: LingoMe, t_ar_struct: LingoValue) {
  var t_iBlkNum = t_ar_struct[1];
  var t_iSprNum = t_ar_struct[2];
  var t_iProp = t_ar_struct[3];
  for (var t_rBlk of meProp(_me, "m_ar_frames").toArray()) {
  if (lingoBinary("eq", t_rBlk[symbol("num")], t_iBlkNum)) {
  for (var t_rSpr of t_rBlk[symbol("sprites")].toArray()) {
  if (lingoBinary("eq", t_rSpr[symbol("num")], t_iSprNum)) {
  return t_rSpr[t_iProp];
  }

  }

  }

  }

  return undefined;
}

