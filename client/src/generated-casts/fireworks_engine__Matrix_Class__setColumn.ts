// fireworks_engine.cct / Matrix Class / setColumn

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setColumn(_me: LingoMe, n: LingoValue, data: LingoValue) {
  if (lingoBinary("or", lingoBinary("lt", n, 1), lingoBinary("gt", n, meProp(_me, "iCols")))) {
  callNamed("put", "Matrix Class : setColumn() : column out of range")
  return 0;
  }

  if ((lingoTruthy(data) ? 0 : 1)) {
  callNamed("put", "Matrix Class : setColumn() : data invalid")
  return 0;
  }

  if (lingoBinary("neq", callMethod("count", data), meProp(_me, "iRows"))) {
  callNamed("put", "Matrix Class : setColum() : data wrong size")
  return 0;
  }

  for (var i = 1; i <= meProp(_me, "iRows"); ++i) {
  meProp(_me, "vData")[i][n] = data[i];
  }

  return 1;
}

