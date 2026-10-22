// fireworks_engine.cct / Matrix Class / loadIdentity

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function loadIdentity(_me: LingoMe) {
  if (lingoBinary("neq", meProp(_me, "iRows"), meProp(_me, "iCols"))) {
  callNamed("put", "Matrix Class : loadIdentity() : Nonsymmetric matrices can't be loaded with identity matrix")
  return 0;
  }

  for (var i = 1; i <= meProp(_me, "iRows"); ++i) {
  for (var j = 1; j <= meProp(_me, "iCols"); ++j) {
  if (lingoBinary("eq", i, j)) {
  meProp(_me, "vData")[i][j] = 1;
  continue;
  }

  meProp(_me, "vData")[i][j] = 0;
  }

  }

  return 1;
}

