// fireworks_engine.cct / Matrix Class / new

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _new(_me: LingoMe, t_iRows: LingoValue, t_iCols: LingoValue, t_vData: LingoValue) {
  setMeProp(_me, "m_rMtxSrc", _me.script);
  setMeProp(_me, "vData", new LingoList([]));
  setMeProp(_me, "iRows", t_iRows);
  setMeProp(_me, "iCols", t_iCols);
  if (callNamed("voidp", t_vData)) {
  for (var i = 1; i <= meProp(_me, "iRows"); ++i) {
  meProp(_me, "vData")[i] = new LingoList([]);
  for (var j = 1; j <= meProp(_me, "iCols"); ++j) {
  meProp(_me, "vData")[i][j] = 0;
  }

  }

  } else {
  for (var i = 1; i <= meProp(_me, "iRows"); ++i) {
  meProp(_me, "vData")[i] = new LingoList([]);
  for (var j = 1; j <= meProp(_me, "iCols"); ++j) {
  meProp(_me, "vData")[i][j] = t_vData[i][j];
  }

  }

  }

  return _me;
}

