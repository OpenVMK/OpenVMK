// core.old.cct / CWindowCommonButton / changeState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function changeState(_me: LingoMe, tstate: LingoValue) {
  callMethod("UpdateImageObjects", _me, undefined, tstate)
  setThePropOf(_me, "pImage", callMethod("createButtonImg", _me, meProp(_me, "pButtonText"), tstate));
  callMethod("render", _me)
}

