// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFactorPoster / FloatAround

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function FloatAround(_me: LingoMe, _this: LingoValue, a_ptPos: LingoValue) {
  var t_rObj = callMethod("getObject", _this);
  var t_rWall = callMethod("GetOwner", t_rObj);
  var t_iDir = callNamed("integer", callMethod("GetParam", t_rObj, "DIR"));
  var t_iXD = callNamed("integer", callMethod("GetParam", t_rObj, "XD"));
  var t_iYD = callNamed("integer", callMethod("GetParam", t_rObj, "YD"));
  var t_iZD = callNamed("integer", callMethod("GetParam", t_rObj, "ZD"));
  if (lingoBinary("eq", t_iDir, 5)) {
  var t_veOff = callNamed("vector", lingoBinary("sub", 1000, lingoBinary("div", t_iXD, 2)), 1000, lingoBinary("sub", 1000, lingoBinary("div", t_iZD, 2)));
  } else {
  t_veOff = callNamed("vector", 1000, lingoBinary("sub", 1000, lingoBinary("div", t_iYD, 2)), lingoBinary("sub", 1000, lingoBinary("div", t_iZD, 2)));
  }

  callMethod("SetRelPos", t_rObj, lingoBinary("add", callMethod("ScrToRel", callMethod("GetVisual", t_rWall), a_ptPos), t_veOff))
  if (theProperty("controlDown")) {
  callNamed("put", lingoBinary("add", callMethod("ScrToRel", callMethod("GetVisual", t_rWall), a_ptPos), t_veOff))
  }

  callMethod("_Rotate", _this, t_iDir)
  callMethod("SetBlend", callMethod("GetVisual", t_rObj), 50)
  return 1;
}

