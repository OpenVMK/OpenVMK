// 3f02613936ba018480acffaf92dd883a.cct / CAnimationSprite / GetParam

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetParam(_me: LingoMe, i_rParam: LingoValue) {
  var tPos = callMethod("findPos", meProp(_me, "m_ar_spriteData"), i_rParam);
  if (lingoBinary("neq", tPos, 0)) {
  return meProp(_me, "m_ar_spriteData")[tPos];
  } else {
  return 0;
  }

}

