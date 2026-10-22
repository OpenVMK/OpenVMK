// fda7c1aad86c08c12d1a13ae95116821.cct / RoomMath / ScrToAbs

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ScrToAbs(_me: LingoMe, a_ptLoc: LingoValue, a_ptClick: LingoValue) {
  var t_pCenter = a_ptLoc;
  var tVecX = callNamed("vector", 1, 0, 1);
  var tVecY = callNamed("vector", -float(1), 0, 1);
  var tVecZ = callNamed("vector", 1, 0, -float(1));
  var tOgPoint = callNamed("vector", lingoBinary("sub", a_ptClick.locH, t_pCenter.locH), 0, lingoBinary("mul", lingoBinary("sub", a_ptClick.locV, t_pCenter.locV), 2));
  var t_iX = callNamed("integer", lingoBinary("div", callMethod("dot", tVecX, tOgPoint), lingoBinary("mul", callMethod("length", tVecX), callMethod("length", tVecX))));
  tOgPoint = callNamed("vector", lingoBinary("sub", a_ptClick.locH, t_pCenter.locH), 0, lingoBinary("mul", lingoBinary("sub", a_ptClick.locV, t_pCenter.locV), 2));
  var t_iZ = callNamed("integer", lingoBinary("div", callMethod("dot", tVecZ, tOgPoint), lingoBinary("mul", callMethod("length", tVecZ), callMethod("length", tVecZ))));
  return callNamed("point", lingoBinary("add", t_iX, t_iZ), t_iZ);
}

