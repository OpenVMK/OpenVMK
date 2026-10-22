// vmk_hm_minigame.cct / CCollisionEngine / Detect

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Detect(_me: LingoMe, objectList: LingoValue, _o: LingoValue) {
  setMeProp(_me, "detectedCollisions", new LingoList([]));
  if (lingoBinary("gt", callNamed("count", meProp(_me, "detectedCollisions")), 0)) {
  return 1;
  }

  return 0;
}

