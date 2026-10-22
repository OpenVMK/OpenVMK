// fireworks_engine.cct / Simple 3D View Class / buildViewMatrix

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function buildViewMatrix(_me: LingoMe, theta: LingoValue, omega: LingoValue, mu: LingoValue) {
  var t_sinTheta = callNamed("sin", theta);
  var t_cosTheta = callNamed("cos", theta);
  var t_sinOmega = callNamed("sin", omega);
  var t_cosOmega = callNamed("cos", omega);
  var t_matrixData = new LingoList([]);
  t_matrixData[1] = new LingoList([-float(t_sinTheta), lingoBinary("mul", -float(t_cosTheta), t_cosOmega), lingoBinary("mul", -float(t_cosTheta), t_sinOmega), 0]);
  t_matrixData[2] = new LingoList([t_cosTheta, lingoBinary("mul", -float(t_sinTheta), t_cosOmega), lingoBinary("mul", -float(t_sinTheta), t_sinOmega), 0]);
  t_matrixData[3] = new LingoList([0, t_sinTheta, -float(t_cosOmega), 0]);
  t_matrixData[4] = new LingoList([0, 0, mu, 1]);
  var t_viewMatrix = callMethod("new", callNamed("script", "Matrix Class"), 4, 4, t_matrixData);
  callMethod("orthonormalize", t_viewMatrix, symbol("right"))
  return t_viewMatrix;
}

