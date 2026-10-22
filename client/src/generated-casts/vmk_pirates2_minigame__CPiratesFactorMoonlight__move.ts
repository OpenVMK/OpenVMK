// vmk_pirates2_minigame.cct / CPiratesFactorMoonlight / move

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function move(_me: LingoMe) {
  var tMyObject = callMethod("getObject", _me);
  var t_ar_gameParams = callMethod("GetParam", tMyObject, "GameParams");
  var tVelX = t_ar_gameParams[1];
  var tVelY = t_ar_gameParams[2];
  var tPos = callMethod("GetParam", tMyObject, "WorldPosition");
  tPos = callMethod("add", tPos, callNamed("intvector", tVelX, tVelY, 0));
  callMethod("SetParam", tMyObject, "WorldPosition", tPos)
  callMethod("SetParam", tMyObject, "GameParams", t_ar_gameParams)
}

