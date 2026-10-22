// fireworks_engine.cct / Matrix Class / transform

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function transform(_me: LingoMe, t_vector: LingoValue) {
  var t_x = lingoBinary("add", lingoBinary("add", lingoBinary("add", lingoBinary("mul", t_vector.x, meProp(_me, "vData")[1][1]), lingoBinary("mul", t_vector.y, meProp(_me, "vData")[2][1])), lingoBinary("mul", t_vector.z, meProp(_me, "vData")[3][1])), meProp(_me, "vData")[4][1]);
  var t_y = lingoBinary("add", lingoBinary("add", lingoBinary("add", lingoBinary("mul", t_vector.x, meProp(_me, "vData")[1][2]), lingoBinary("mul", t_vector.y, meProp(_me, "vData")[2][2])), lingoBinary("mul", t_vector.z, meProp(_me, "vData")[3][2])), meProp(_me, "vData")[4][2]);
  var t_z = lingoBinary("add", lingoBinary("add", lingoBinary("add", lingoBinary("mul", t_vector.x, meProp(_me, "vData")[1][3]), lingoBinary("mul", t_vector.y, meProp(_me, "vData")[2][3])), lingoBinary("mul", t_vector.z, meProp(_me, "vData")[3][3])), meProp(_me, "vData")[4][3]);
  return callNamed("vector", t_x, t_y, t_z);
}

