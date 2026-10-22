// fireworks_engine.cct / CFireworkPayload / new

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _new(_me: LingoMe) {
  setMeProp(_me, "m_ar_emitters", new LingoList([]));
  setMeProp(_me, "m_vPosition", callNamed("vector", 0, 0, 0));
  setMeProp(_me, "m_vVelocity", callNamed("vector", 0, 0, 0));
  setMeProp(_me, "m_fLagTime", float(0));
  setMeProp(_me, "m_fAge", float(0));
  setMeProp(_me, "m_fMaxEmitterAge", float(0));
  setMeProp(_me, "m_bExploded", 0);
  setMeProp(_me, "m_ar_rocketVisual", new LingoPropList([]));
  setMeProp(_me, "m_ar_activeEmitters", new LingoList([]));
  return _me;
}

