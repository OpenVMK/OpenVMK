// fireworks_engine.cct / Simple 3D View Class / transformToProjected

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function transformToProjected(_me: LingoMe, t_vector: LingoValue) {
  if (lingoBinary("eq", t_vector.z, 0)) {
  callNamed("put", "3D View Class : transformToProjected() : can't handle z = 0, please reset near clipping plane to > 0")
  return undefined;
  }

  // HAND-CORRECTED: Director vector components are floats; a whole-number z made z / fProjectionPD an integer 0.
  return callNamed("vector", lingoBinary("div", t_vector.x, lingoBinary("div", float(t_vector.z), meProp(_me, "fProjectionPD"))), lingoBinary("div", t_vector.y, lingoBinary("div", float(t_vector.z), meProp(_me, "fProjectionPD"))), t_vector.z);
}

