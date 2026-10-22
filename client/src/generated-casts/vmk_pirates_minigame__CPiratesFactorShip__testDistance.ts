// vmk_pirates_minigame.cct / CPiratesFactorShip / testDistance

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function testDistance(_me: LingoMe, i_pos1X: LingoValue, i_pos1Y: LingoValue, i_pos2X: LingoValue, i_pos2Y: LingoValue, i_distance: LingoValue) {
  /* global */ var g_profShipFactorAcc = globalVar("g_profShipFactorAcc");
  /* global */ var g_profCollisionAcc = globalVar("g_profCollisionAcc");
  var distX = callNamed("abs", lingoBinary("sub", i_pos2X, i_pos1X));
  var distY = callNamed("abs", lingoBinary("sub", i_pos2Y, i_pos1Y));
  if (lingoBinary("or", lingoBinary("gt", distX, i_distance), lingoBinary("gt", distY, i_distance))) {
  return 0;
  } else {
  if (lingoBinary("lt", lingoBinary("add", lingoBinary("mul", distX, distX), lingoBinary("mul", distY, distY)), lingoBinary("mul", i_distance, i_distance))) {
  return 1;
  }

  }

  return 0;
}

