// fireworks_engine.cct / CFireworksEngineComponent / SetParticleSystem

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetParticleSystem(_me: LingoMe, i_rParticleSystem: LingoValue) {
  setMeProp(_me, "m_particleSystem", i_rParticleSystem);
}

