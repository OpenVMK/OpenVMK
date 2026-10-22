// vmk_pirates_game.cct / MathMethods / InverseAxonometricPosition

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
  var tVecX = callNamed("vector", 1, 1, 0);
  var tVecY = callNamed("vector", -float(1), 1, 0);
  var tX = lingoBinary("div", callMethod("dot", tVecX, tOgPoint), lingoBinary("mul", callMethod("length", tVecX), callMethod("length", tVecX)));
  var tY = lingoBinary("div", callMethod("dot", tVecY, tOgPoint), lingoBinary("mul", callMethod("length", tVecY), callMethod("length", tVecY)));
  return callNamed("point", callNamed("integer", lingoBinary("mul", tX, 100)), callNamed("integer", lingoBinary("mul", tY, 100)));
}

