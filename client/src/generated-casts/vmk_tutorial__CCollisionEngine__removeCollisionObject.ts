// vmk_tutorial.cct / CCollisionEngine / removeCollisionObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removeCollisionObject(_me: LingoMe, _o: LingoValue) {
  callMethod("deleteOne", meProp(_me, "collisionObjects"), _o)
}

