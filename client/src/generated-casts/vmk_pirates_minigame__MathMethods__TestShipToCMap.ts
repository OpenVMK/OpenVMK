// vmk_pirates_minigame.cct / MathMethods / TestShipToCMap

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TestShipToCMap(_me: LingoMe, i_rShip: LingoValue, i_rMap: LingoValue) {
  var tpoint = callNamed("point", callMethod("GetParam", i_rShip, "WorldPosition").x, callMethod("GetParam", i_rShip, "WorldPosition").y);
  return callMethod("TestPointToCMap", i_rMap, tpoint);
}

