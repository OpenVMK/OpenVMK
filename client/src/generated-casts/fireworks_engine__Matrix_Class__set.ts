// fireworks_engine.cct / Matrix Class / set

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _set(_me: LingoMe, row: LingoValue, column: LingoValue, data: LingoValue) {
  if (lingoBinary("or", lingoBinary("lt", row, 1), lingoBinary("gt", row, meProp(_me, "iRows")))) {
  callNamed("put", "Matrix Class : set() : row out of range")
  return 0;
  }

  if (lingoBinary("or", lingoBinary("lt", column, 1), lingoBinary("gt", column, meProp(_me, "iCols")))) {
  callNamed("put", "Matrix Class : set() : column out of range")
  return 0;
  }

  if ((lingoTruthy(data) ? 0 : 1)) {
  callNamed("put", "Matrix Class : set() : data invalid")
  return 0;
  }

  meProp(_me, "vData")[row][column] = data;
  return 1;
}

