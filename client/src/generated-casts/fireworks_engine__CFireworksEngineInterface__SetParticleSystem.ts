// fireworks_engine.cct / CFireworksEngineInterface / SetParticleSystem

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetParticleSystem(_me: LingoMe, i_rPS: LingoValue) {
  callMethod("SetParticleSystem", meProp(_me, "m_fwEngineCore"), i_rPS)
}

