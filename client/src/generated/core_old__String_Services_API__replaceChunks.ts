// core.old.cct / String Services API / replaceChunks

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function replaceChunks(_me: LingoMe, a_sString: LingoValue, a_cChunkA: LingoValue, a_cChunkB: LingoValue) {
  return callMethod("replaceChunks", callNamed("getStringServices"), a_sString, a_cChunkA, a_cChunkB);
}

