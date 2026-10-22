// vmk_minigame.cct / CIterateSeed / BitRight

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function BitRight(_me: LingoMe, _this: LingoValue, n: LingoValue, s: LingoValue) {
  s = lingoBinary("mod", s, 32);
  if (lingoBinary("gt", n, 0)) {
  return callNamed("bitOr", lingoBinary("div", n, callNamed("power", 2, s)), 0);
  } else {
  var f = lingoBinary("div", n, callNamed("power", 2, s));
  var i = callNamed("integer", f);
  if (lingoBinary("gt", i, f)) {
  return lingoBinary("sub", i, 1);
  } else {
  return i;
  }

  }

}

