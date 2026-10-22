// minigame_engine_potc2.cct / CCollision / TestTripleCircleToTripleCircleCollision

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TestTripleCircleToTripleCircleCollision(_me: LingoMe, i_rThisObject: LingoValue, i_rOtherObject: LingoValue) {
  var t_rGameEngine = callMethod("getComponent", callNamed("getThread", symbol("MiniGame")));
  var t_rVelTable = callMethod("GetVelocityTable", t_rGameEngine);
  var tThisPos = callMethod("GetParam", i_rThisObject, "WorldPosition");
  var tOtherPos = callMethod("GetParam", i_rOtherObject, "WorldPosition");
  var tThisDir = callMethod("GetParam", i_rThisObject, "Direction");
  var tOtherDir = callMethod("GetParam", i_rOtherObject, "Direction");
  var distanceX = callNamed("abs", lingoBinary("sub", tOtherPos.x, tThisPos.x));
  if (lingoBinary("gt", distanceX, lingoBinary("add", callMethod("GetParam", i_rThisObject, "LargestRadius"), callMethod("GetParam", i_rOtherObject, "LargestRadius")))) {
  return 0;
  }

  var distanceY = callNamed("abs", lingoBinary("sub", tOtherPos.y, tThisPos.y));
  if (lingoBinary("gt", distanceY, lingoBinary("add", callMethod("GetParam", i_rThisObject, "LargestRadius"), callMethod("GetParam", i_rOtherObject, "LargestRadius")))) {
  return 0;
  }

  var circle1aX = lingoBinary("add", tThisPos.x, lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelX", t_rVelTable, tThisDir), callMethod("GetParam", i_rThisObject, "1stOffset")), 256));
  var circle1aY = lingoBinary("add", tThisPos.y, lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelY", t_rVelTable, tThisDir), callMethod("GetParam", i_rThisObject, "1stOffset")), 256));
  var circle1bX = lingoBinary("add", tOtherPos.x, lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelX", t_rVelTable, tOtherDir), callMethod("GetParam", i_rOtherObject, "1stOffset")), 256));
  var circle1bY = lingoBinary("add", tOtherPos.y, lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelY", t_rVelTable, tOtherDir), callMethod("GetParam", i_rOtherObject, "1stOffset")), 256));
  if (callMethod("testDistance", _me, circle1aX, circle1aY, circle1bX, circle1bY, lingoBinary("add", callMethod("GetParam", i_rThisObject, "1stRadius"), callMethod("GetParam", i_rOtherObject, "1stRadius")))) {
  return 1;
  }

  if (callMethod("testDistance", _me, tThisPos.x, tThisPos.y, circle1bX, circle1bY, lingoBinary("add", callMethod("GetParam", i_rThisObject, "2ndRadius"), callMethod("GetParam", i_rOtherObject, "1stRadius")))) {
  return 1;
  }

  if (callMethod("testDistance", _me, circle1aX, circle1aY, tOtherPos.x, tOtherPos.y, lingoBinary("add", callMethod("GetParam", i_rThisObject, "1stRadius"), callMethod("GetParam", i_rOtherObject, "2ndRadius")))) {
  return 1;
  }

  var circle3bX = lingoBinary("add", tOtherPos.x, lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelX", t_rVelTable, tOtherDir), callMethod("GetParam", i_rOtherObject, "3rdOffset")), 256));
  var circle3bY = lingoBinary("add", tOtherPos.y, lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelY", t_rVelTable, tOtherDir), callMethod("GetParam", i_rOtherObject, "3rdOffset")), 256));
  if (callMethod("testDistance", _me, circle1aX, circle1aY, circle3bX, circle3bY, lingoBinary("add", callMethod("GetParam", i_rThisObject, "1stRadius"), callMethod("GetParam", i_rOtherObject, "3rdRadius")))) {
  return 1;
  }

  if (callMethod("testDistance", _me, tThisPos.x, tThisPos.y, circle3bX, circle3bY, lingoBinary("add", callMethod("GetParam", i_rThisObject, "2ndRadius"), callMethod("GetParam", i_rOtherObject, "3rdRadius")))) {
  return 1;
  }

  if (callMethod("testDistance", _me, tThisPos.x, tThisPos.y, tOtherPos.x, tOtherPos.y, lingoBinary("add", callMethod("GetParam", i_rThisObject, "2ndRadius"), callMethod("GetParam", i_rOtherObject, "2ndRadius")))) {
  return 1;
  }

  var circle3aX = lingoBinary("add", tThisPos.x, lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelX", t_rVelTable, tThisDir), callMethod("GetParam", i_rThisObject, "3rdOffset")), 256));
  var circle3aY = lingoBinary("add", tThisPos.y, lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelY", t_rVelTable, tThisDir), callMethod("GetParam", i_rThisObject, "3rdOffset")), 256));
  if (callMethod("testDistance", _me, circle3aX, circle3aY, circle1bX, circle1bY, lingoBinary("add", callMethod("GetParam", i_rThisObject, "3rdRadius"), callMethod("GetParam", i_rOtherObject, "1stRadius")))) {
  return 1;
  }

  if (callMethod("testDistance", _me, circle3aX, circle3aY, tOtherPos.x, tOtherPos.y, lingoBinary("add", callMethod("GetParam", i_rThisObject, "3rdRadius"), callMethod("GetParam", i_rOtherObject, "2ndRadius")))) {
  return 1;
  }

  circle3bX = lingoBinary("add", tOtherPos.x, lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelX", t_rVelTable, tOtherDir), callMethod("GetParam", i_rOtherObject, "3rdOffset")), 256));
  circle3bY = lingoBinary("add", tOtherPos.y, lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelY", t_rVelTable, tOtherDir), callMethod("GetParam", i_rOtherObject, "3rdOffset")), 256));
  if (callMethod("testDistance", _me, circle3aX, circle3aY, circle3bX, circle3bY, lingoBinary("add", callMethod("GetParam", i_rThisObject, "3rdRadius"), callMethod("GetParam", i_rOtherObject, "3rdRadius")))) {
  return 1;
  }

  return 0;
}

