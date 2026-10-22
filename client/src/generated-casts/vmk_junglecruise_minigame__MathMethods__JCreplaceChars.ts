// vmk_junglecruise_minigame.cct / MathMethods / JCreplaceChars

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function JCreplaceChars(_me: LingoMe, tString: LingoValue, tCharA: LingoValue, tCharB: LingoValue) {
  if (lingoBinary("eq", tCharA, tCharB)) {
  return tString;
  }

  while (lingoBinary("gt", callNamed("offset", tCharA, tString), 0)) {
  /* chunk assignment not ported */;
  }

  return tString;
}

