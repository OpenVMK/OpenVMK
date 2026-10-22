// core.old.cct / Resource API / getmemnum

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getmemnum(_me: LingoMe, a_sName: LingoValue) {
  return callMethod("getmemnum", callNamed("getResourceManager"), a_sName);
}

