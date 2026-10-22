// vmk_junglecruise_minigame.cct / CCollisionEngine / setBounce

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setBounce(_me: LingoMe, _bounce: LingoValue) {
  setMeProp(_me, "bounce", _bounce);
}

