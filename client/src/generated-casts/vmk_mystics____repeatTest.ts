// vmk_mystics.cct /  / repeatTest

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function repeatTest(_me: LingoMe) {
  for (var i = 1; i <= 100; ++i) {
  if (lingoBinary("eq", i, 50)) {
  break;
  continue;
  }

  callNamed("trace", lingoBinary("join", "Hello: ", i))
  }

  for (var j = 1; j <= 100; ++j) {
  break;
  }

}

