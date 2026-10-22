// vmk_fireworks.cct / CFireworksStage / Get3DParticleLimit

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Get3DParticleLimit(_me: LingoMe) {
  return meProp(_me, "m_i3DParticleLimit");
}

