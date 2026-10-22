// d0e535313898676eb605277339b50f27.cct / CBodypartClassHauntedMansion / defineDir

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function defineDir(_me: LingoMe, tdir: LingoValue, tPart: LingoValue) {
  if (lingoBinary("or", callNamed("voidp", tPart), lingoBinary("eq", tPart, meProp(_me, "m_sPart")))) {
  setMeProp(_me, "m_iBodyDir", tdir);
  }

}

