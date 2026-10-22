// vmk_junglecruise_minigame.cct / CCollisionEngine / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  for (var tCollisionObject of meProp(_me, "collisionObjects").toArray()) {
  callMethod("update", tCollisionObject)
  }

  callMethod("DetectCollisions", _me)
}

