// 3f02613936ba018480acffaf92dd883a.cct / CAnimationSprite / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  setMeProp(_me, "m_i_frameCounter", 0);
  setMeProp(_me, "m_bActive", 0);
  for (var tFrame of meProp(_me, "m_ar_frames").toArray()) {
  }

  return 1;
}

