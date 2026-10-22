// fireworks_engine.cct / CFireworkPayload / setLagTime

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setLagTime(_me: LingoMe, i_fLagTime: LingoValue) {
  setMeProp(_me, "m_fLagTime", i_fLagTime);
}

