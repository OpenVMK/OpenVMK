// 239fb1d2675fc448140198b03238814c.cct / VMKUTILS / HideSpriteLimitCounter

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HideSpriteLimitCounter(_me: LingoMe) {
  callNamed("removeObject", "SpriteLimitCounter")
}

