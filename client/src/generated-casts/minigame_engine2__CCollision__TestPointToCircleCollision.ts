// minigame_engine2.cct / CCollision / TestPointToCircleCollision

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TestPointToCircleCollision(_me: LingoMe, i_rThisObject: LingoValue, i_rOtherObject: LingoValue) {
  var distanceX = lingoBinary("sub", callMethod("GetParam", i_rOtherObject, "WorldPosition").x, callMethod("GetParam", i_rThisObject, "WorldPosition").x);
  if (lingoBinary("lt", distanceX, 0)) {
  distanceX = -float(distanceX);
  }

  var distanceY = lingoBinary("sub", callMethod("GetParam", i_rOtherObject, "WorldPosition").y, callMethod("GetParam", i_rThisObject, "WorldPosition").y);
  if (lingoBinary("lt", distanceY, 0)) {
  distanceY = -float(distanceY);
  }

  if (lingoBinary("lt", callNamed("sqrt", lingoBinary("add", lingoBinary("mul", distanceX, distanceX), lingoBinary("mul", distanceY, distanceY))), callMethod("GetParam", i_rOtherObject, "BoundingCircleRadius"))) {
  return 1;
  } else {
  return 0;
  }

}

