// vmk_junglecruise_minigame.cct / CCollisionEngine / addToCollisionMap

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addToCollisionMap(_me: LingoMe, _e: LingoValue) {
  callMethod("add", meProp(_me, "collisionMap"), _e)
}

