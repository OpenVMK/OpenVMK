// vmk_jungle_cruise.cct / CBoundingCircle / setVelocity

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setVelocity(_me: LingoMe, v: LingoValue) {
  callMethod("setVelocityN", _me, v.x, v.y)
}

