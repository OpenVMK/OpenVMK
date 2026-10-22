// fireworks_engine.cct / Particle System Class / initParticleSystem

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initParticleSystem(_me: LingoMe) {
  setMeProp(_me, "m_lastTime", theProperty("milliSeconds"));
  setMeProp(_me, "m_gravity", callNamed("vector", 0, -float(9.81), 0));
  callNamed("receiveUpdate", callMethod("getID", _me))
}

