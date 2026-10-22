// vmk_hm_minigame.cct / CHMStage / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if (lingoBinary("neq", callNamed("getObject", "HMCollisionEngine"), 0)) {
  callNamed("removeObject", "HMCollisionEngine")
  }

  callMethod("removeRattlers", _me)
  return 1;
}

