// 3f02613936ba018480acffaf92dd883a.cct / CAnimationChannel / hide

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function hide(_me: LingoMe) {
  setThePropOf(meProp(_me, "m_rSprite"), "visible", 0);
  setMeProp(_me, "m_bActive", 0);
}

