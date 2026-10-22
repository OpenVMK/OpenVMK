// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualFloor / _ScrToRel

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ScrToRel(_me: LingoMe, _this: LingoValue, a_ptPoint: LingoValue) {
  var t_veCenter = callMethod("GetScrPos", callMethod("getObject", _this));
  var t_veOrig = callNamed("vector", lingoBinary("sub", a_ptPoint.locH, t_veCenter.x), lingoBinary("mul", lingoBinary("sub", a_ptPoint.locV, t_veCenter.y), 2), 0);
  var t_veVecX = callNamed("vector", 1, 1, 0);
  var t_veVecY = callNamed("vector", -float(1), 1, 0);
  var t_fX = lingoBinary("div", callMethod("dot", t_veVecX, t_veOrig), lingoBinary("mul", callMethod("length", t_veVecX), callMethod("length", t_veVecX)));
  var t_fY = lingoBinary("div", callMethod("dot", t_veVecY, t_veOrig), lingoBinary("mul", callMethod("length", t_veVecY), callMethod("length", t_veVecY)));
  return callNamed("point", callNamed("integer", t_fX), callNamed("integer", t_fY));
}

