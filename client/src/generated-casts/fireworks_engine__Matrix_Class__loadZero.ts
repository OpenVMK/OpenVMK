// fireworks_engine.cct / Matrix Class / loadZero

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function loadZero(_me: LingoMe) {
  for (var i = 1; i <= meProp(_me, "iRows"); ++i) {
  for (var j = 1; j <= meProp(_me, "iCols"); ++j) {
  meProp(_me, "vData")[i][j] = 0;
  }

  }

  return 1;
}

