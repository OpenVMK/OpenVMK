// vmk_hm_minigame.cct / CHMCoffinRattler / rattle

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function rattle(_me: LingoMe) {
  var t_deltaPos = callNamed("point", callNamed("random", 5), callNamed("random", 5));
  callMethod("updatepos", _me, t_deltaPos)
}

