// 42c66f7b170484e24189f467fe87b08d.cct / CSoundObjectBU / resetSound

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function resetSound(_me: LingoMe) {
  setMeProp(_me, "m_mpSndProps", new LingoPropList([symbol("member"), meProp(_me, "m_rMemSound")]));
}

