// fireworks_engine.cct / Particle Class / SetRemoveFlag

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetRemoveFlag(_me: LingoMe, a_bVal: LingoValue) {
  setMeProp(_me, "m_removeFlag", a_bVal);
}

