// fireworks_engine.cct / Matrix Class / scale

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function scale(_me: LingoMe, t_scale: LingoValue, pOutputMatrix: LingoValue) {
  var t_newData = new LingoList([]);
  for (var i = 1; i <= meProp(_me, "iRows"); ++i) {
  t_newData[i] = new LingoList([]);
  for (var j = 1; j <= meProp(_me, "iCols"); ++j) {
  t_newData[i][j] = lingoBinary("mul", meProp(_me, "vData")[i][j], t_scale);
  }

  }

  callMethod("setData", pOutputMatrix, t_newData)
  return 1;
}

