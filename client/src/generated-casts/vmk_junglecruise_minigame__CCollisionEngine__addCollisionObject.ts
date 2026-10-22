// vmk_junglecruise_minigame.cct / CCollisionEngine / addCollisionObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addCollisionObject(_me: LingoMe, _o: LingoValue) {
  callMethod("append", meProp(_me, "collisionObjects"), _o)
}

