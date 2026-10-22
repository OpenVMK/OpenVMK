// 3f02613936ba018480acffaf92dd883a.cct / CAnimationSprite / getFrameData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getFrameData(_me: LingoMe) {
  if (lingoBinary("neq", meProp(_me, "m_ar_frames").count, 0)) {
  setMeProp(_me, "m_i_frameCounter", callNamed("min", meProp(_me, "m_i_frameCounter"), meProp(_me, "m_ar_frames").count));
  return meProp(_me, "m_ar_frames")[meProp(_me, "m_i_frameCounter")];
  } else {
  return new LingoPropList([]);
  }

}

