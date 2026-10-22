// fireworks_engine.cct / Simple 3D View Class / testClip

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function testClip(_me: LingoMe, t_vector: LingoValue) {
  if (lingoBinary("or", lingoBinary("lt", t_vector.z, meProp(_me, "fViewNearClip")), lingoBinary("gt", t_vector.z, meProp(_me, "fViewFarClip")))) {
  return 0;
  } else {
  return 1;
  }

}

