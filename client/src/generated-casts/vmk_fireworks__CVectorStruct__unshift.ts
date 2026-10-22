// vmk_fireworks.cct / CVectorStruct / unshift

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function unshift(_me: LingoMe, t_rdata: LingoValue) {
  callMethod("addAt", _me, 1, t_rdata)
  return _me.count;
}

