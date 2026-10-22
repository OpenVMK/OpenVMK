// fireworks_engine.cct / CFireworksEngineInterface / ExplodeBomb

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ExplodeBomb(_me: LingoMe, i_rBomb: LingoValue, i_fPowerMod: LingoValue, i_fPPSMod: LingoValue, i_fSpreadMod: LingoValue, i_fLifeMod: LingoValue) {
  callMethod("ExplodeBomb", meProp(_me, "m_fwEngineCore"), i_rBomb, i_fPowerMod, i_fPPSMod, i_fSpreadMod, i_fLifeMod)
}

