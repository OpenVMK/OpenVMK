// fireworks_engine.cct / Matrix Class / setRow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setRow(_me: LingoMe, n: LingoValue, data: LingoValue) {
  if (lingoBinary("or", lingoBinary("lt", n, 1), lingoBinary("gt", n, meProp(_me, "iRows")))) {
  callNamed("put", "Matrix Class : setRow() : row out of range")
  return 0;
  }

  if ((lingoTruthy(data) ? 0 : 1)) {
  callNamed("put", "Matrix Class : setRow() : data invalid")
  return 0;
  }

  if (lingoBinary("neq", callMethod("count", data), meProp(_me, "iCols"))) {
  callNamed("put", "Matrix Class : setRow() : data wrong size")
  return 0;
  }

  meProp(_me, "vData")[n] = data;
  return 1;
}

