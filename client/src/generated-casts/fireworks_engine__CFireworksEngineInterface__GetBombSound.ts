// fireworks_engine.cct / CFireworksEngineInterface / GetBombSound

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetBombSound(_me: LingoMe, i_sType: LingoValue, i_parameter: LingoValue) {
  var tBombDesc = callNamed("getVariableValue", i_sType);
  return tBombDesc[symbol("sound")][i_parameter];
}

