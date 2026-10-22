// vmk_hm_minigame.cct / CHMFactorGhost / UpdateParameters

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateParameters(_me: LingoMe, i_ar_data: LingoValue) {
  callNamed("put", lingoBinary("joinPad", "Ghost updates data", i_ar_data))
}

