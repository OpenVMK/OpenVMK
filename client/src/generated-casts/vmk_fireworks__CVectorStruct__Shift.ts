// vmk_fireworks.cct / CVectorStruct / Shift

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Shift(_me: LingoMe) {
  if ((lingoTruthy(callMethod("isEmpty", _me)) ? 0 : 1)) {
  var t_rdata = _me[1];
  callMethod("deleteAt", _me, 1)
  return t_rdata;
  }

  return undefined;
}

