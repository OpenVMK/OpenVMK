// fireworks_engine.cct / Matrix Class / add

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function add(_me: LingoMe, p_otherMatrix: LingoValue, pOutputMatrix: LingoValue) {
  if (lingoBinary("or", lingoBinary("neq", callMethod("getNRows", p_otherMatrix), meProp(_me, "iRows")), lingoBinary("neq", callMethod("getNColumns", p_otherMatrix), meProp(_me, "iCols")))) {
  callNamed("put", "Matrix Class : add() : can't add two matrices of different size")
  return 0;
  }

  var t_vOtherData = callMethod("GetData", p_otherMatrix);
  var t_newData = new LingoList([]);
  for (var i = 1; i <= meProp(_me, "iRows"); ++i) {
  t_newData[i] = new LingoList([]);
  for (var j = 1; j <= meProp(_me, "iCols"); ++j) {
  t_newData[i][j] = lingoBinary("add", meProp(_me, "vData")[i][j], t_vOtherData[i][j]);
  }

  }

  callMethod("setData", pOutputMatrix, t_newData)
  return 1;
}

