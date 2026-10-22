// vmk_pirates_game.cct / CPiratesComponent / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  /* global */ var g_profComponent = globalVar("g_profComponent");
  if (meProp(_me, "m_prepared")) {
  callMethod("UnprepareRoom", _me)
  }

  return 1;
}

