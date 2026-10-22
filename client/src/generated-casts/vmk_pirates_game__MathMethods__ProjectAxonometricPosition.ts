// vmk_pirates_game.cct / MathMethods / ProjectAxonometricPosition

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ProjectAxonometricPosition(_me: LingoMe, i_pPos: LingoValue) {
  var tVecX = callNamed("intvector", 1, 1, 0);
  var tVecY = callNamed("intvector", -float(1), 1, 0);
  var t_pCenter = callNamed("point", 400, 300);
  var tOut = callMethod("add", callMethod("multiply", tVecX, i_pPos.locH), callMethod("multiply", tVecY, i_pPos.locV));
  setThePropOf(tOut, "y", lingoBinary("mul", tOut.y, 0.5));
  return callNamed("point", lingoBinary("add", lingoBinary("div", tOut.x, 100), t_pCenter.locH), lingoBinary("add", lingoBinary("div", tOut.y, 100), t_pCenter.locV));
}

