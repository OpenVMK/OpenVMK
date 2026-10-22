// vmk_hm_minigame.cct / CollisionEngineMathMethods / InverseAxonometricPosition

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function InverseAxonometricPosition(_me: LingoMe, i_pClick: LingoValue) {
  var t_pCenter = callNamed("point", 400, 300);
  var tOgPoint = callNamed("vector", lingoBinary("sub", i_pClick.locH, t_pCenter.locH), lingoBinary("mul", lingoBinary("sub", i_pClick.locV, t_pCenter.locV), 2), 0);
  var tVecX = callNamed("vector", float(1), float(1), float(0));
  var tVecY = callNamed("vector", -float(float(1)), float(1), float(0));
  var tX = lingoBinary("div", callMethod("dot", tVecX, tOgPoint), lingoBinary("mul", tVecX.length, tVecX.length));
  var tY = lingoBinary("div", callMethod("dot", tVecY, tOgPoint), lingoBinary("mul", tVecY.length, tVecY.length));
  return callNamed("point", callNamed("integer", tX), callNamed("integer", tY));
}

