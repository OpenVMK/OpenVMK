// vmk_tutorial.cct / CCollisionEngine / draw

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function draw(_me: LingoMe, g: LingoValue, bAxionomicProjection: LingoValue) {
  for (var i = 1; i <= callNamed("count", meProp(_me, "collisionMap")); ++i) {
  callMethod("draw", meProp(_me, "collisionMap")[i], g, bAxionomicProjection)
  }

}

