// 3f02613936ba018480acffaf92dd883a.cct / CAnimationComponent / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if (lingoBinary("neq", callNamed("getObject", "AnimationManager"), 0)) {
  callNamed("removeObject", "AnimationManager")
  }

  callNamed("removeUpdate", callMethod("getID", _me))
  return 1;
}

