// d0e535313898676eb605277339b50f27.cct / CBodypartClassHauntedMansion / defineInk

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function defineInk(_me: LingoMe, tInk: LingoValue) {
  if (callNamed("voidp", tInk)) {
  switch (meProp(_me, "m_sPart")) {
case "ey":
  tInk = 36;
  break;
  default:
  tInk = 41;
  }

  }

  meProp(_me, "m_mpDrawProps")[symbol("ink")] = tInk;
  return 1;
}

