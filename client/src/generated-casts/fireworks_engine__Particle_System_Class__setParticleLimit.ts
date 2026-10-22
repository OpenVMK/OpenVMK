// fireworks_engine.cct / Particle System Class / setParticleLimit

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setParticleLimit(_me: LingoMe, i_limit: LingoValue) {
  setMeProp(_me, "m_particleLimit", i_limit);
}

