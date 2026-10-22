// vmk_minigame.cct / CCollision / TestPointToBoxCollision

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TestPointToBoxCollision(_me: LingoMe, i_rThisObject: LingoValue, i_rOtherObject: LingoValue) {
  var ar_bounds = callMethod("GetParam", i_rOtherObject, "BoxDimensions");
  var tMyPos = callMethod("GetParam", i_rThisObject, "WorldPosition");
  var tOtherPos = callMethod("GetParam", i_rOtherObject, "WorldPosition");
  if (lingoBinary("and", lingoBinary("and", lingoBinary("and", lingoBinary("gt", tMyPos.x, lingoBinary("add", tOtherPos.x, ar_bounds[1].x)), lingoBinary("lt", tMyPos.x, lingoBinary("add", tOtherPos.x, ar_bounds[2].x))), lingoBinary("gt", tMyPos.y, lingoBinary("add", tOtherPos.y, ar_bounds[1].y))), lingoBinary("lt", tMyPos.y, lingoBinary("add", tOtherPos.y, ar_bounds[2].y)))) {
  return 1;
  }

  return 0;
}

