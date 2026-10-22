// 42c66f7b170484e24189f467fe87b08d.cct / CSoundObjectBU / deconsturct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconsturct(_me: LingoMe) {
  callMethod("StopSound", _me)
  setMeProp(_me, "m_mpSndProps", undefined);
  setMeProp(_me, "m_iSoundChannel", undefined);
  setMeProp(_me, "m_sSoundType", undefined);
  return 1;
}

