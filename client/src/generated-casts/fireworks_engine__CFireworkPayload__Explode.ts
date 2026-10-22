// fireworks_engine.cct / CFireworkPayload / Explode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Explode(_me: LingoMe, i_rFireworkEngine: LingoValue, i_fPowerMod: LingoValue, i_fPPSMod: LingoValue, i_fSpreadMod: LingoValue, i_fLifeMod: LingoValue) {
  setMeProp(_me, "m_fLagTime", meProp(_me, "m_fAge"));
  callMethod("ExplodeBomb", i_rFireworkEngine, _me, i_fPowerMod, i_fPPSMod, i_fSpreadMod, i_fLifeMod)
}

