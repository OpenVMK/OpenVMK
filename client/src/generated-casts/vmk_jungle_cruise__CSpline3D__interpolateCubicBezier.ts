// vmk_jungle_cruise.cct / CSpline3D / interpolateCubicBezier

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function interpolateCubicBezier(_me: LingoMe, t: LingoValue, p1: LingoValue, p2: LingoValue, p3: LingoValue, p4: LingoValue) {
  var u = lingoBinary("sub", float(1), t);
  var v = lingoBinary("mul", lingoBinary("mul", float(3), u), t);
  return lingoBinary("add", lingoBinary("add", lingoBinary("add", lingoBinary("mul", lingoBinary("mul", lingoBinary("mul", u, u), u), p1), lingoBinary("mul", lingoBinary("mul", u, v), p2)), lingoBinary("mul", lingoBinary("mul", v, t), p3)), lingoBinary("mul", lingoBinary("mul", lingoBinary("mul", t, t), t), p4));
}

