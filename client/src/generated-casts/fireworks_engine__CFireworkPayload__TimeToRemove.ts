// fireworks_engine.cct / CFireworkPayload / TimeToRemove

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TimeToRemove(_me: LingoMe) {
  return lingoBinary("gte", meProp(_me, "m_fAge"), lingoBinary("add", meProp(_me, "m_fLagTime"), meProp(_me, "m_fMaxEmitterAge")));
}

