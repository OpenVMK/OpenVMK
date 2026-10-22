// fireworks_engine.cct / CFireworksEngineComponent / GetParticleParams

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetParticleParams(_me: LingoMe, i_sStyle: LingoValue) {
  var tParams = callNamed("getVariableValue", i_sStyle);
  return tParams;
}

