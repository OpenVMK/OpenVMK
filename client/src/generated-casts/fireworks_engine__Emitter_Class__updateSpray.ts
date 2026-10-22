// fireworks_engine.cct / Emitter Class / updateSpray

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateSpray(_me: LingoMe, p_dt: LingoValue, p_pParticleSystem: LingoValue) {
  setMeProp(_me, "m_fAge", lingoBinary("add", meProp(_me, "m_fAge"), p_dt));
  if (lingoBinary("and", lingoBinary("gt", meProp(_me, "m_fEmitterAgeLimit"), float(0)), lingoBinary("gt", meProp(_me, "m_fAge"), meProp(_me, "m_fEmitterAgeLimit")))) {
  setMeProp(_me, "m_removeFlag", 1);
  return;
  }

  var t_toWorld = callMethod("duplicate", callMethod("getToWorldMatrix", _me));
  callMethod("setRow", t_toWorld, 4, new LingoList([0, 0, 0, 1]))
  setMeProp(_me, "m_countIterator", lingoBinary("add", meProp(_me, "m_countIterator"), lingoBinary("mul", meProp(_me, "m_fParticlesPerSecond"), p_dt)));
  var t_iCount = callNamed("integer", lingoBinary("mul", meProp(_me, "m_fParticlesPerSecond"), p_dt));
  setMeProp(_me, "m_countIterator", lingoBinary("sub", meProp(_me, "m_countIterator"), t_iCount));
  var t_rotXMtx = callNamed("new", meProp(_me, "m_mtxSrc"), 4, 4);
  var t_rotZMtx = callNamed("new", meProp(_me, "m_mtxSrc"), 4, 4);
  var t_totalRotMtx = callNamed("new", meProp(_me, "m_mtxSrc"), 4, 4);
  for (var i = 1; i <= t_iCount; ++i) {
  var t_fRandom1 = lingoBinary("div", callNamed("float", lingoBinary("sub", callNamed("random", 100000000), 50000000)), 50000000);
  var t_fRandom3 = lingoBinary("div", callNamed("float", lingoBinary("sub", callNamed("random", 100000000), 50000000)), 50000000);
  var t_tempFwd = callMethod("getRight", callMethod("getTransform", _me));
  callMethod("loadRotateX", t_rotXMtx, lingoBinary("div", lingoBinary("mul", t_fRandom1, meProp(_me, "m_fConeAngle")), 2))
  callMethod("loadRotateZ", t_rotZMtx, lingoBinary("div", lingoBinary("mul", t_fRandom3, meProp(_me, "m_fConeAngle")), 2))
  callMethod("multiply", t_rotXMtx, t_rotZMtx, t_totalRotMtx)
  var t_launchVector = callMethod("transform", t_totalRotMtx, t_tempFwd);
  var t_worldSpaceLaunchVector = callMethod("transform", t_toWorld, t_launchVector);
  callMethod("normalize", t_worldSpaceLaunchVector)
  t_worldSpaceLaunchVector = lingoBinary("mul", t_worldSpaceLaunchVector, meProp(_me, "m_fStartVelocity"));
  callMethod("requestNewParticle", p_pParticleSystem, meProp(_me, "m_mp_particleParams")[symbol("spriteList")], t_worldSpaceLaunchVector, meProp(_me, "m_mp_particleParams")[symbol("life")], callMethod("getPosition", _me), meProp(_me, "m_mp_particleParams")[symbol("randomAmount")])
  }

}

