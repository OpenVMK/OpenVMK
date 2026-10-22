// fireworks_engine.cct / Particle System Class / requestNewEmitter

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function requestNewEmitter(_me: LingoMe, i_startVelocity: LingoValue, i_pps: LingoValue, i_coneAngle: LingoValue, i_emitterAgeLimit: LingoValue, i_particleParams: LingoValue) {
  var t_newEmitter = undefined;
  if (lingoBinary("lt", lingoBinary("add", callMethod("count", meProp(_me, "m_emitterPool")), callMethod("count", meProp(_me, "m_newEmitters"))), meProp(_me, "m_emitterLimit"))) {
  t_newEmitter = callNamed("createObject", symbol("random"), "3D Object Class", "Emitter Class");
  if ((lingoTruthy(t_newEmitter) ? 0 : 1)) {
  callNamed("put", "Error creating emitter")
  return;
  }

  callMethod("initObject", t_newEmitter)
  callMethod("setParent", t_newEmitter, meProp(_me, "m_rootObject"))
  callMethod("initEmitter", t_newEmitter, i_startVelocity, i_pps, i_coneAngle, i_emitterAgeLimit, i_particleParams)
  callMethod("append", meProp(_me, "m_emitterPool"), t_newEmitter)
  }

  return t_newEmitter;
}

