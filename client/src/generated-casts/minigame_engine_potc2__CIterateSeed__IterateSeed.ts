// minigame_engine_potc2.cct / CIterateSeed / IterateSeed

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function IterateSeed(_me: LingoMe, _this: LingoValue, a_iSeed: LingoValue) {
  var t_iSeed2 = 0;
  if (lingoBinary("eq", a_iSeed, 0)) {
  a_iSeed = -float(1);
  }

  t_iSeed2 = callMethod("BitLeft", _this, a_iSeed, 13);
  a_iSeed = callNamed("bitXor", a_iSeed, t_iSeed2);
  t_iSeed2 = callMethod("BitRight", _this, a_iSeed, 17);
  a_iSeed = callNamed("bitXor", a_iSeed, t_iSeed2);
  t_iSeed2 = callMethod("BitLeft", _this, a_iSeed, 5);
  a_iSeed = callNamed("bitXor", a_iSeed, t_iSeed2);
  return a_iSeed;
}

