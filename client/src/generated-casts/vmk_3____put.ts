// vmk_3.dcr /  / put

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function put(_me: LingoMe, a: LingoValue, b: LingoValue, c: LingoValue, d: LingoValue) {
  if (lingoBinary("or", lingoBinary("contains", a, "Avatar data"), lingoBinary("contains", b, "Avatar data"))) {
  callNamed("trace", "avatar data has indeed been parsed!")
  }

}

