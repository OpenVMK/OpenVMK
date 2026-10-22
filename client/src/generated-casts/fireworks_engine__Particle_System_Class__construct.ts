// fireworks_engine.cct / Particle System Class / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_particlePool", new LingoList([]));
  setMeProp(_me, "m_emitterPool", new LingoList([]));
  setMeProp(_me, "m_newParticles", new LingoList([]));
  setMeProp(_me, "m_newEmitters", new LingoList([]));
  setMeProp(_me, "m_particleLimit", 1000);
  setMeProp(_me, "m_emitterLimit", 10);
  setMeProp(_me, "m_particleSrc", callNamed("script", "Particle Class"));
  setMeProp(_me, "m_rootObject", callNamed("createObject", symbol("random"), "3D Object Class"));
  callMethod("initObject", meProp(_me, "m_rootObject"))
}

