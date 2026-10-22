// fireworks_engine.cct / CFireworkPayload / SetExploded

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetExploded(_me: LingoMe, i_bVal: LingoValue) {
  setMeProp(_me, "m_bExploded", i_bVal);
}

