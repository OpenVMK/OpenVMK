// vmk_pirates_game.cct / MathMethods / DirectionFromVector

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DirectionFromVector(_me: LingoMe, i_vVector: LingoValue) {
  var tOperator = callNamed("vector", i_vVector.x, i_vVector.y, i_vVector.z);
  callMethod("normalize", tOperator)
  var tUp = callNamed("vector", float(0), -float(float(1)), float(0));
  var tCosAlpha = callMethod("dot", tOperator, tUp);
  var tRight = callNamed("vector", float(1), float(0), float(0));
  var tAngle = float(0);
  if (lingoBinary("gt", callMethod("dot", tOperator, tRight), float(0))) {
  if (lingoBinary("eq", tCosAlpha, -float(float(1)))) {
  tAngle = float(180);
  } else {
  tAngle = lingoBinary("mul", callNamed("arcCos", tCosAlpha), lingoBinary("div", float(180), callNamed("pi")));
  }

  } else {
  if (lingoBinary("eq", tCosAlpha, -float(float(1)))) {
  tAngle = float(180);
  } else {
  tAngle = lingoBinary("sub", float(360), lingoBinary("mul", callNamed("arcCos", tCosAlpha), lingoBinary("div", float(180), callNamed("pi"))));
  }

  }

  return callNamed("integer", tAngle);
}

