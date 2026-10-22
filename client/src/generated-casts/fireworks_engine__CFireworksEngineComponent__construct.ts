// fireworks_engine.cct / CFireworksEngineComponent / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_ar_fireworks", new LingoList([]));
  setMeProp(_me, "m_ar_rocketParticles", new LingoList([]));
  setMeProp(_me, "m_particleSystem", undefined);
  callNamed("receiveUpdate", callMethod("getID", _me))
  setMeProp(_me, "m_lastTime", theProperty("milliSeconds"));
  setMeProp(_me, "m_autoExplode", 1);
}

