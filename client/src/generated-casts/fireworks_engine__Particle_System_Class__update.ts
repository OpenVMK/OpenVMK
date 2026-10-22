// fireworks_engine.cct / Particle System Class / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  var t_currentTime = theProperty("milliSeconds");
  var t_deltaTime = lingoBinary("div", callNamed("float", lingoBinary("sub", t_currentTime, meProp(_me, "m_lastTime"))), float(1000));
  setMeProp(_me, "m_lastTime", t_currentTime);
  var t_newParticlePool = new LingoList([]);
  for (var i = 1; i <= callMethod("count", meProp(_me, "m_particlePool")); ++i) {
  if ((lingoTruthy(callMethod("getRemoveFlag", meProp(_me, "m_particlePool")[i])) ? 0 : 1)) {
  callMethod("append", t_newParticlePool, meProp(_me, "m_particlePool")[i])
  }

  }

  setMeProp(_me, "m_particlePool", t_newParticlePool);
  var t_newEmitterPool = new LingoList([]);
  for (var i = 1; i <= callMethod("count", meProp(_me, "m_emitterPool")); ++i) {
  if ((lingoTruthy(callMethod("getRemoveFlag", meProp(_me, "m_emitterPool")[i])) ? 0 : 1)) {
  callMethod("append", t_newEmitterPool, meProp(_me, "m_emitterPool")[i])
  }

  }

  setMeProp(_me, "m_emitterPool", t_newEmitterPool);
  for (var i = 1; i <= callMethod("count", meProp(_me, "m_newParticles")); ++i) {
  callMethod("append", meProp(_me, "m_particlePool"), meProp(_me, "m_newParticles")[i])
  }

  for (var i = 1; i <= callMethod("count", meProp(_me, "m_newEmitters")); ++i) {
  callMethod("append", meProp(_me, "m_emitterPool"), meProp(_me, "m_newEmitters")[i])
  }

  setMeProp(_me, "m_newParticles", new LingoList([]));
  setMeProp(_me, "m_newEmitters", new LingoList([]));
  var t_gravityPull = lingoBinary("mul", meProp(_me, "m_gravity"), t_deltaTime);
  callNamed("call", symbol("updateParticle"), meProp(_me, "m_particlePool"), t_deltaTime, t_gravityPull)
  callNamed("call", symbol("updateSpray"), meProp(_me, "m_emitterPool"), t_deltaTime, _me)
}

