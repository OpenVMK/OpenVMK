// core.old.cct / CWindowFieldWrapper / adjustYOffsetTo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function adjustYOffsetTo(_me: LingoMe, tY: LingoValue) {
  callMethod("adjustOffsetTo", _me, meProp(_me, "pOffX"), tY)
}

