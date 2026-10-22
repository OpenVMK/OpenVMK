// fireworks_engine.cct / Simple 3D View Class / transformToViewSpace

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function transformToViewSpace(_me: LingoMe, t_vector: LingoValue) {
  return callMethod("transform", meProp(_me, "viewMatrix"), t_vector);
}

