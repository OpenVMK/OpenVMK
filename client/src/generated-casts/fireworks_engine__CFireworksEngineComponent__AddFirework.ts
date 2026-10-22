// fireworks_engine.cct / CFireworksEngineComponent / AddFirework

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AddFirework(_me: LingoMe, i_payload: LingoValue) {
  callMethod("append", meProp(_me, "m_ar_fireworks"), i_payload)
  callMethod("append", meProp(_me, "m_ar_rocketParticles"), callMethod("requestNewParticle", meProp(_me, "m_particleSystem"), callMethod("GetRocketVisual", i_payload), callNamed("vector", 0, 0, 0), callMethod("GetLagTime", i_payload), callMethod("getPosition", i_payload)))
}

