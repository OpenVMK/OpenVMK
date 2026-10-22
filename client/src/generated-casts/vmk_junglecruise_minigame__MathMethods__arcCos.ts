// vmk_junglecruise_minigame.cct / MathMethods / arcCos

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function arcCos(_me: LingoMe, i_val: LingoValue) {
  return lingoBinary("sub", lingoBinary("div", callNamed("pi"), 2), callNamed("atan", lingoBinary("div", i_val, callNamed("sqrt", lingoBinary("sub", float(1), lingoBinary("mul", i_val, i_val))))));
}

