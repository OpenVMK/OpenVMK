// core.old.cct / CDecoderRC4 / createKey

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createKey(_me: LingoMe) {
  if (lingoBinary("neq", _player, undefined)) {
  if (_player.traceScript) {
  return 0;
  }

  }

  var tKey = "";
  var tSeed = theProperty("randomSeed");
  setTheProperty("randomSeed", theProperty("milliSeconds"));
  for (var i = 1; i <= 4; ++i) {
  tKey = lingoBinary("join", tKey, callNamed("convertIntToHex", lingoBinary("sub", callNamed("random", 256), 1)));
  }

  setTheProperty("randomSeed", tSeed);
  return callNamed("abs", callNamed("convertHexToInt", tKey));
}

