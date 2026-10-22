// vmk_tutorial.cct / CBoundingCircle / addCollisionModifier

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addCollisionModifier(_me: LingoMe, _modifier: LingoValue) {
  callMethod("append", meProp(_me, "collisionModifiers"), _modifier)
}

