// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomAnchor / GetScrPos

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetScrPos(_me: LingoMe, _this: LingoValue) {
  var t_veAbs = lingoBinary("add", callMethod("GetAbsPos", callMethod("GetOwner", _this)), callMethod("GetRelPos", _this));
  var t_veOff = callMethod("GetScrPos", callMethod("GetContext", _this));
  var t_fX = t_veAbs.x;
  var t_fY = t_veAbs.y;
  var t_fZ = t_veAbs.z;
  var t_fXs = lingoBinary("add", lingoBinary("sub", t_fX, t_fY), t_veOff.x);
  var t_fYs = lingoBinary("add", lingoBinary("add", -float(t_fZ), lingoBinary("mul", 0.5, lingoBinary("add", t_fX, t_fY))), t_veOff.y);
  var t_fZs = lingoBinary("add", lingoBinary("add", lingoBinary("add", lingoBinary("mul", t_fX, 10), lingoBinary("mul", t_fY, 10)), lingoBinary("mul", t_fZ, 5)), t_veOff.z);
  return callNamed("vector", t_fXs, t_fYs, t_fZs);
}

