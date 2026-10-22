// 42c66f7b170484e24189f467fe87b08d.cct / CSoundChannelObject / deconsturct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconsturct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_r_SndChannel", undefined);
  setMeProp(_me, "m_sNowPlaying", undefined);
  setMeProp(_me, "m_sSoundType", undefined);
  setMeProp(_me, "m_iDuration", 0);
  setMeProp(_me, "m_iCounter", 0);
  setMeProp(_me, "m_iDurationLeft", 0);
  setMeProp(_me, "m_iChannelStatus", 0);
  setMeProp(_me, "m_bInfiniteLoop", 0);
  return 1;
}

