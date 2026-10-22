// fireworks_engine.cct / Matrix Class / getColumn

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getColumn(_me: LingoMe, n: LingoValue) {
  var t_lColumn = new LingoList([]);
  for (var i = 1; i <= meProp(_me, "iRows"); ++i) {
  t_lColumn[i] = meProp(_me, "vData")[i][n];
  }

  return t_lColumn;
}

