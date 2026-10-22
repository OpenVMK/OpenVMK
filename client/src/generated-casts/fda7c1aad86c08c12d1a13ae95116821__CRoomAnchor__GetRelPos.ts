// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomAnchor / GetRelPos

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetRelPos(_me: LingoMe, _this: LingoValue) {
  var t_iX = callNamed("integer", callMethod("GetParam", _this, "X"));
  var t_iY = callNamed("integer", callMethod("GetParam", _this, "Y"));
  var t_iZ = callNamed("integer", callMethod("GetParam", _this, "Z"));
  return callNamed("vector", t_iX, t_iY, t_iZ);
}

