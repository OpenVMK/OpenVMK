// core.old.cct / CWindowImageWrapper / setOffsetX

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setOffsetX(_me: LingoMe, tX: LingoValue) {
  callMethod("adjustOffsetTo", _me, tX, meProp(_me, "pOffY"))
}

