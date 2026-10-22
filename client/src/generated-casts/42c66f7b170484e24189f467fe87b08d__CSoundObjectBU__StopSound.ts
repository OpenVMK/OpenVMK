// 42c66f7b170484e24189f467fe87b08d.cct / CSoundObjectBU / StopSound

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StopSound(_me: LingoMe) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_iSoundChannel"))) ? 0 : 1)) {
  callMethod("stop", callNamed("sound", meProp(_me, "m_iSoundChannel")))
  }

}

