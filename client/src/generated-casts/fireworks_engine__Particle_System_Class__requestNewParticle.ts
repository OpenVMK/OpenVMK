// fireworks_engine.cct / Particle System Class / requestNewParticle

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function requestNewParticle(_me: LingoMe, i_spriteSeq: LingoValue, i_launchVector: LingoValue, i_ageLimit: LingoValue, i_position: LingoValue, i_randomAmount: LingoValue) {
  var t_newParticle = undefined;
  if (lingoBinary("lt", lingoBinary("add", callMethod("count", meProp(_me, "m_particlePool")), callMethod("count", meProp(_me, "m_newParticles"))), meProp(_me, "m_particleLimit"))) {
  t_newParticle = callMethod("new", meProp(_me, "m_particleSrc"), i_spriteSeq, i_launchVector, i_ageLimit, i_position, i_randomAmount);
  callMethod("append", meProp(_me, "m_newParticles"), t_newParticle)
  }

  return t_newParticle;
}

