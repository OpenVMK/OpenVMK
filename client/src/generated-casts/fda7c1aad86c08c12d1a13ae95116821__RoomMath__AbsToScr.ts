// fda7c1aad86c08c12d1a13ae95116821.cct / RoomMath / AbsToScr

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AbsToScr(_me: LingoMe, a_veLoc: LingoValue) {
  var t_fX = a_veLoc.x;
  var t_fY = a_veLoc.y;
  var t_fZ = a_veLoc.z;
  var t_fXs = lingoBinary("sub", t_fX, t_fY);
  var t_fYs = lingoBinary("add", -float(t_fZ), lingoBinary("mul", 0.5, lingoBinary("add", t_fX, t_fY)));
  var t_fZs = lingoBinary("add", lingoBinary("add", lingoBinary("mul", t_fX, 10), lingoBinary("mul", t_fY, 10)), lingoBinary("mul", t_fZ, 5));
  return callNamed("vector", t_fXs, t_fYs, t_fZs);
}

