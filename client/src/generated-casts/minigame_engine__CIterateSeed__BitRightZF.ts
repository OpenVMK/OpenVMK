// minigame_engine.cct / CIterateSeed / BitRightZF

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function BitRightZF(_me: LingoMe, _this: LingoValue, n: LingoValue, s: LingoValue) {
  s = lingoBinary("mod", s, 32);
  if (lingoBinary("lt", n, 0)) {
  if (lingoBinary("eq", s, 0)) {
  return lingoBinary("add", lingoBinary("add", lingoBinary("mul", callNamed("float", theProperty("maxinteger")), 2), 2), n);
  } else {
  return callNamed("bitOr", lingoBinary("div", lingoBinary("add", lingoBinary("add", n, theProperty("maxinteger")), 1), callNamed("power", 2, s)), callNamed("power", 2, lingoBinary("sub", 31, s)));
  }

  } else {
  return callNamed("bitOr", lingoBinary("div", n, callNamed("power", 2, s)), 0);
  }

}

