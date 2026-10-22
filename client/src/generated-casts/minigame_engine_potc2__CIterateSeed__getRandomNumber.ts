// minigame_engine_potc2.cct / CIterateSeed / getRandomNumber

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getRandomNumber(_me: LingoMe, _this: LingoValue, iteratedSeed: LingoValue, maxValue: LingoValue) {
  if (lingoBinary("lt", iteratedSeed, 0)) {
  return lingoBinary("mod", callNamed("abs", iteratedSeed), maxValue);
  } else {
  return lingoBinary("mod", iteratedSeed, maxValue);
  }

}

