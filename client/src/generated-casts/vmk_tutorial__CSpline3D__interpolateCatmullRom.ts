// vmk_tutorial.cct / CSpline3D / interpolateCatmullRom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function interpolateCatmullRom(_me: LingoMe, t: LingoValue, p1: LingoValue, p2: LingoValue, p3: LingoValue, p4: LingoValue) {
  return lingoBinary("add", lingoBinary("mul", lingoBinary("mul", t, lingoBinary("sub", lingoBinary("add", lingoBinary("mul", t, lingoBinary("sub", lingoBinary("add", lingoBinary("sub", lingoBinary("add", lingoBinary("add", lingoBinary("mul", t, lingoBinary("add", lingoBinary("sub", lingoBinary("mul", float(3), lingoBinary("sub", p2, p3)), p1), p4)), p1), p1), lingoBinary("mul", float(5), p2)), lingoBinary("mul", float(4), p3)), p4)), p3), p1)), 0.5), p2);
}

