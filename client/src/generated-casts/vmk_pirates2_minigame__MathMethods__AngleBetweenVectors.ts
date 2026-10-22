// vmk_pirates2_minigame.cct / MathMethods / AngleBetweenVectors

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AngleBetweenVectors(_me: LingoMe, i_vVec1: LingoValue, i_vVec2: LingoValue) {
  var tTestVec1 = callNamed("vector", i_vVec1.x, i_vVec1.y, i_vVec1.z);
  var tTestVec2 = callNamed("vector", i_vVec2.x, i_vVec2.y, i_vVec2.z);
  var tCosAlpha = lingoBinary("div", callMethod("dot", tTestVec1, tTestVec2), lingoBinary("mul", callMethod("length", tTestVec1), callMethod("length", tTestVec2)));
  var tAngle = lingoBinary("mul", callNamed("arcCos", tCosAlpha), lingoBinary("div", float(180), callNamed("pi")));
  return callNamed("integer", tAngle);
}

