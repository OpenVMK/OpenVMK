// 3f02613936ba018480acffaf92dd883a.cct / CAnimationComponent / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  callNamed("call", symbol("update"), meProp(_me, "m_mp_arrangements"))
  callNamed("call", symbol("render"), meProp(_me, "m_mp_arrangements"))
}

