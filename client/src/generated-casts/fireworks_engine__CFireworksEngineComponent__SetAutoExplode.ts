// fireworks_engine.cct / CFireworksEngineComponent / SetAutoExplode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetAutoExplode(_me: LingoMe, i_bVal: LingoValue) {
  setMeProp(_me, "m_autoExplode", i_bVal);
}

