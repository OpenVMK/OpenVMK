// core.old.cct / CWindowCommonButton / Activate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Activate(_me: LingoMe) {
  setThePropOf(_me.pSprite, "blend", 100);
  setMeProp(_me, "pBlend", 100);
  return 1;
}

