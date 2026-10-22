// core.old.cct / CWindowImageButton / changeState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function changeState(_me: LingoMe, tstate: LingoValue) {
  setThePropOf(_me, "pImage", callMethod("createButtonImg", _me, tstate));
  callMethod("render", _me)
}

