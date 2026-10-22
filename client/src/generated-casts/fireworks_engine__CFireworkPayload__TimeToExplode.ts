// fireworks_engine.cct / CFireworkPayload / TimeToExplode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TimeToExplode(_me: LingoMe) {
  return lingoBinary("gte", meProp(_me, "m_fAge"), meProp(_me, "m_fLagTime"));
}

