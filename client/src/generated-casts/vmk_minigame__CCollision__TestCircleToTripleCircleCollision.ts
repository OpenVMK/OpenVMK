// vmk_minigame.cct / CCollision / TestCircleToTripleCircleCollision

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TestCircleToTripleCircleCollision(_me: LingoMe, i_rThisObject: LingoValue, i_rOtherObject: LingoValue) {
  var t_rGameEngine = callMethod("getComponent", callNamed("getThread", symbol("MiniGame")));
  var t_rVelTable = callMethod("GetVelocityTable", t_rGameEngine);
  var tThisPos = callMethod("GetParam", i_rThisObject, "WorldPosition");
  var tOtherPos = callMethod("GetParam", i_rOtherObject, "WorldPosition");
  var tOtherDir = callMethod("GetParam", i_rOtherObject, "Direction");
  var distanceX = callNamed("abs", lingoBinary("sub", tOtherPos.x, tThisPos.x));
  if (lingoBinary("gt", distanceX, lingoBinary("add", callMethod("GetParam", i_rThisObject, "BoundingCircleRadius"), callMethod("GetParam", i_rOtherObject, "LargestRadius")))) {
  return 0;
  }

  var distanceY = callNamed("abs", lingoBinary("sub", tOtherPos.y, tThisPos.y));
  if (lingoBinary("gt", distanceY, lingoBinary("add", callMethod("GetParam", i_rThisObject, "BoundingCircleRadius"), callMethod("GetParam", i_rOtherObject, "LargestRadius")))) {
  return 0;
  }

  var circle1X = lingoBinary("add", tOtherPos.x, lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelX", t_rVelTable, tOtherDir), callMethod("GetParam", i_rOtherObject, "1stOffset")), 256));
  var circle1Y = lingoBinary("add", tOtherPos.y, lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelY", t_rVelTable, tOtherDir), callMethod("GetParam", i_rOtherObject, "1stOffset")), 256));
  if (callMethod("testDistance", _me, circle1X, circle1Y, tThisPos.x, tThisPos.y, lingoBinary("add", callMethod("GetParam", i_rThisObject, "BoundingCircleRadius"), callMethod("GetParam", i_rOtherObject, "1stRadius")))) {
  return 1;
  }

  if (callMethod("testDistance", _me, tOtherPos.x, tOtherPos.y, tThisPos.x, tThisPos.y, lingoBinary("add", callMethod("GetParam", i_rThisObject, "BoundingCircleRadius"), callMethod("GetParam", i_rOtherObject, "2ndRadius")))) {
  return 1;
  }

  var circle3X = lingoBinary("add", tOtherPos.x, lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelX", t_rVelTable, tOtherDir), callMethod("GetParam", i_rOtherObject, "3rdOffset")), 256));
  var circle3Y = lingoBinary("add", tOtherPos.y, lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelY", t_rVelTable, tOtherDir), callMethod("GetParam", i_rOtherObject, "3rdOffset")), 256));
  if (callMethod("testDistance", _me, circle3X, circle3Y, tThisPos.x, tThisPos.y, lingoBinary("add", callMethod("GetParam", i_rThisObject, "BoundingCircleRadius"), callMethod("GetParam", i_rOtherObject, "3rdRadius")))) {
  return 1;
  }

  return 0;
}

