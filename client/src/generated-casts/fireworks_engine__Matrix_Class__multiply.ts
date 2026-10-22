// fireworks_engine.cct / Matrix Class / multiply

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function multiply(_me: LingoMe, p_otherMatrix: LingoValue, pOutputMatrix: LingoValue) {
  if (lingoBinary("neq", meProp(_me, "iCols"), callMethod("getNRows", p_otherMatrix))) {
  callNamed("put", "Matrix Class : multiply() : multiplication of matrices is not defined ( num of columns of this must match num of rows of the other )")
  return undefined;
  }

  var t_iCols = callMethod("getNColumns", p_otherMatrix);
  var t_newData = new LingoList([]);
  for (var i = 1; i <= meProp(_me, "iRows"); ++i) {
  t_newData[i] = new LingoList([]);
  for (var j = 1; j <= t_iCols; ++j) {
  var t_lThisRow = callMethod("getRow", _me, i);
  var t_lOtherColumn = callMethod("getColumn", p_otherMatrix, j);
  t_newData[i][j] = 0;
  for (var n = 1; n <= t_iCols; ++n) {
  t_newData[i][j] = lingoBinary("add", t_newData[i][j], lingoBinary("mul", t_lThisRow[n], t_lOtherColumn[n]));
  }

  }

  }

  callMethod("setData", pOutputMatrix, t_newData)
  return 1;
}

