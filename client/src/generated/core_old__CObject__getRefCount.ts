// core.old.cct / CObject / getRefCount

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getRefCount(_me: LingoMe, _this: LingoValue) {
  return lingoBinary("sub", callNamed("integer", callNamed("string", _this).word[lingoBinary("sub", callNamed("string", callNamed("param", 1)).word.count, 1)]), 3);
}

