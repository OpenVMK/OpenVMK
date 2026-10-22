// vmk_fireworks.cct / CFireworksGameComponent / GetFireworkId

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetFireworkId(_me: LingoMe, i_index: LingoValue) {
  return meProp(_me, "m_ar_fwList")[i_index][symbol("id")];
}

