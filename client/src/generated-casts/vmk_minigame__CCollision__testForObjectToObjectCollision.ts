// vmk_minigame.cct / CCollision / testForObjectToObjectCollision

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function testForObjectToObjectCollision(_me: LingoMe, i_rThisObject: LingoValue, i_rOtherObject: LingoValue) {
  if (lingoBinary("eq", i_rThisObject, i_rOtherObject)) {
  return;
  }

  switch (callMethod("GetParam", i_rOtherObject, "BoundsType")) {
case symbol("none"):
  return 0;
case symbol("point"):
  switch (callMethod("GetParam", i_rThisObject, "BoundsType")) {
case symbol("none"):
  return 0;
case symbol("point"):
  return 0;
case symbol("circle"):
  return callMethod("TestPointToCircleCollision", _me, i_rOtherObject, i_rThisObject);
case symbol("triplecircle"):
  return callMethod("TestPointToTripleCircleCollision", _me, i_rOtherObject, i_rThisObject);
case symbol("box"):
  return callMethod("TestPointToBoxCollision", _me, i_rOtherObject, i_rThisObject);
  }

  break;
case symbol("circle"):
  switch (callMethod("GetParam", i_rThisObject, "BoundsType")) {
case symbol("none"):
  return 0;
case symbol("point"):
  return callMethod("TestPointToCircleCollision", _me, i_rThisObject, i_rOtherObject);
case symbol("circle"):
  return callMethod("TestCircleToCircleCollision", _me, i_rThisObject, i_rOtherObject);
case symbol("triplecircle"):
  return callMethod("TestCircleToTripleCircleCollision", _me, i_rOtherObject, i_rThisObject);
case symbol("box"):
  return 0;
  }

  break;
case symbol("triplecircle"):
  switch (callMethod("GetParam", i_rThisObject, "BoundsType")) {
case symbol("none"):
  return 0;
case symbol("point"):
  return callMethod("TestPointToTripleCircleCollision", _me, i_rThisObject, i_rOtherObject);
case symbol("circle"):
  return callMethod("TestCircleToTripleCircleCollision", _me, i_rThisObject, i_rOtherObject);
case symbol("triplecircle"):
  return callMethod("TestTripleCircleToTripleCircleCollision", _me, i_rThisObject, i_rOtherObject);
case symbol("box"):
  return 0;
  }

  break;
case symbol("box"):
  switch (callMethod("GetParam", i_rThisObject, "BoundsType")) {
case symbol("none"):
  return 0;
case symbol("point"):
  return callMethod("TestPointToBoxCollision", _me, i_rThisObject, i_rOtherObject);
case symbol("circle"):
  return 0;
case symbol("triplecircle"):
  return 0;
case symbol("box"):
  return 0;
  }

  break;
  }

  return 0;
}

