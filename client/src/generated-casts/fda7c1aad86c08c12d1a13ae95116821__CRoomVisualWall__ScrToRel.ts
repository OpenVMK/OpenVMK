// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualWall / ScrToRel

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ScrToRel(_me: LingoMe, _this: LingoValue, a_ptLoc: LingoValue) {
  var t_ptCenter = callMethod("GetScrPos", callMethod("getObject", _this));
  var t_rObj = callMethod("getObject", _this);
  var t_iXD = callNamed("integer", callMethod("GetParam", t_rObj, "XD"));
  var t_iYD = callNamed("integer", callMethod("GetParam", t_rObj, "YD"));
  if (lingoBinary("gt", t_iXD, t_iYD)) {
  var t_veOrig = callNamed("vector", lingoBinary("sub", a_ptLoc.locH, t_ptCenter.x), 0, lingoBinary("mul", lingoBinary("sub", a_ptLoc.locV, t_ptCenter.y), 2));
  var t_veX = callNamed("vector", 1, 0, 1);
  var t_veZ = callNamed("vector", 1, 0, -float(1));
  var t_iX = lingoBinary("div", callMethod("dot", t_veX, t_veOrig), lingoBinary("mul", callMethod("length", t_veX), callMethod("length", t_veX)));
  var t_iZ = lingoBinary("div", callMethod("dot", t_veZ, t_veOrig), lingoBinary("mul", callMethod("length", t_veZ), callMethod("length", t_veZ)));
  return callNamed("vector", lingoBinary("add", t_iX, t_iZ), 0, t_iZ);
  } else {
  var t_vOrig = callNamed("vector", 0, lingoBinary("sub", a_ptLoc.locH, t_ptCenter.x), lingoBinary("mul", lingoBinary("sub", a_ptLoc.locV, t_ptCenter.y), 2));
  var t_vY = callNamed("vector", 0, 1, 1);
  var t_vO = callNamed("vector", 0, 1, -float(1));
  var t_iY = lingoBinary("div", callMethod("dot", t_vY, t_vOrig), lingoBinary("mul", callMethod("length", t_vY), callMethod("length", t_vY)));
  t_iY = lingoBinary("add", lingoBinary("div", callMethod("dot", t_vO, t_vOrig), lingoBinary("mul", callMethod("length", t_vO), callMethod("length", t_vO))), t_iY);
  var t_vZ = callNamed("vector", 0, -float(1), -float(1));
  t_iZ = lingoBinary("div", callMethod("dot", t_vZ, t_vOrig), lingoBinary("mul", callMethod("length", t_vZ), callMethod("length", t_vZ)));
  return callNamed("vector", 0, -float(t_iY), t_iZ);
  }

}

