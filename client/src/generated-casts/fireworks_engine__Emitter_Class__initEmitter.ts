// fireworks_engine.cct / Emitter Class / initEmitter

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initEmitter(_me: LingoMe, p_startVelocity: LingoValue, p_pps: LingoValue, p_coneAngle: LingoValue, p_emitterAgeLimit: LingoValue, P_mp_particleParams: LingoValue) {
  setMeProp(_me, "m_pSpriteRef", undefined);
  setMeProp(_me, "m_fStartVelocity", float(0));
  setMeProp(_me, "m_fParticlesPerSecond", float(0));
  setMeProp(_me, "m_fAge", float(0));
  setMeProp(_me, "m_fConeAngle", float(180));
  setMeProp(_me, "m_fEmitterAgeLimit", float(0));
  setMeProp(_me, "m_removeFlag", 0);
  setMeProp(_me, "m_countIterator", float(0));
  if (lingoBinary("gt", theProperty("paramCount"), 1)) {
  if (callNamed("ilk", p_startVelocity, symbol("number"))) {
  setMeProp(_me, "m_fStartVelocity", p_startVelocity);
  }

  if (callNamed("ilk", p_pps, symbol("number"))) {
  setMeProp(_me, "m_fParticlesPerSecond", p_pps);
  }

  if (callNamed("ilk", p_coneAngle, symbol("number"))) {
  setMeProp(_me, "m_fConeAngle", p_coneAngle);
  }

  if (callNamed("ilk", p_emitterAgeLimit, symbol("number"))) {
  setMeProp(_me, "m_fEmitterAgeLimit", p_emitterAgeLimit);
  }

  if (callNamed("ilk", P_mp_particleParams, symbol("propList"))) {
  setMeProp(_me, "m_mp_particleParams", P_mp_particleParams);
  }

  }

  setMeProp(_me, "m_mtxSrc", callNamed("script", "Matrix Class"));
}

