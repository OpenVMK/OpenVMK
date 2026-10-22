// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomBezierCurve / _Interpolate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _Interpolate(_me: LingoMe, _this: LingoValue, vA: LingoValue, vB: LingoValue, vC: LingoValue, fT: LingoValue) {
  var t1 = callNamed("power", lingoBinary("sub", float(1), fT), 2);
  var t2 = lingoBinary("mul", lingoBinary("mul", float(2), fT), lingoBinary("sub", float(1), fT));
  var t3 = callNamed("power", fT, 2);
  return callNamed("vector", lingoBinary("add", lingoBinary("add", lingoBinary("mul", t1, vA.x), lingoBinary("mul", t2, vB.x)), lingoBinary("mul", t3, vC.x)), lingoBinary("add", lingoBinary("add", lingoBinary("mul", t1, vA.y), lingoBinary("mul", t2, vB.y)), lingoBinary("mul", t3, vC.y)), lingoBinary("add", lingoBinary("add", lingoBinary("mul", t1, vA.z), lingoBinary("mul", t2, vB.z)), lingoBinary("mul", t3, vC.z)));
}

