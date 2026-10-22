// vmk_hm_minigame.cct / CCollisionEngine / Response

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Response(_me: LingoMe, _o: LingoValue, _b: LingoValue, _f: LingoValue) {
  callMethod("sort", meProp(_me, "detectedCollisions"))
}

