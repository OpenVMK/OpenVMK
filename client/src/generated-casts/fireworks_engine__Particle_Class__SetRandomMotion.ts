// fireworks_engine.cct / Particle Class / SetRandomMotion

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetRandomMotion(_me: LingoMe, i_fVal: LingoValue) {
  setMeProp(_me, "m_fRandomMotion", i_fVal);
}

