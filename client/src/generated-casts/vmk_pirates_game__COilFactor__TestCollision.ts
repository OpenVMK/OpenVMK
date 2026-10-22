// vmk_pirates_game.cct / COilFactor / TestCollision

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TestCollision(_me: LingoMe) {
  var tMyObject = callMethod("getObject", _me);
  var tstate = callMethod("GetParam", tMyObject, "State");
  var tCMap = callMethod("GetCollisionMap", callMethod("getComponent", callNamed("getThread", "piratesminigame")));
  if ((lingoTruthy(callNamed("voidp", tCMap)) ? 0 : 1)) {
  var tMapHeight = callNamed("TestShipToCMap", tMyObject, tCMap);
  if (lingoBinary("or", lingoBinary("eq", tMapHeight, 0), lingoBinary("eq", tMapHeight, -float(1)))) {
  } else {
  if (lingoBinary("eq", tMapHeight, 1)) {
  } else {
  if (lingoBinary("gt", tMapHeight, 1)) {
  return 1;
  }

  }

  }

  } else {
  callNamed("error", _me, "Collision Map Data is missing!!", symbol("move"))
  }

  return 0;
}

