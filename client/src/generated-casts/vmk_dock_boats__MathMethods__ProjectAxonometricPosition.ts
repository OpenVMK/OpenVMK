// vmk_dock_boats.cct / MathMethods / ProjectAxonometricPosition

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ProjectAxonometricPosition(_me: LingoMe, i_pPos: LingoValue) {
  var tVecX = callNamed("vector", float(1), float(1), float(0));
  var tVecY = callNamed("vector", -float(float(1)), float(1), float(0));
  var t_pCenter = callNamed("point", 400, 300);
  var tOut = lingoBinary("add", lingoBinary("mul", tVecX, i_pPos.locH), lingoBinary("mul", tVecY, i_pPos.locV));
  setThePropOf(tOut, "y", lingoBinary("mul", tOut.y, 0.5));
  return callNamed("point", lingoBinary("add", tOut.x, t_pCenter.locH), lingoBinary("add", tOut.y, t_pCenter.locV));
}

