// fireworks_engine.cct / Particle System Class / setEmitterLimit

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setEmitterLimit(_me: LingoMe, i_limit: LingoValue) {
  setMeProp(_me, "m_emitterLimit", i_limit);
}

