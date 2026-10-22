// vmk_junglecruise_minigame.cct / CCollisionEngine / addForces

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addForces(_me: LingoMe, g: LingoValue, i_direction: LingoValue, i_iMAX: LingoValue) {
  if (callNamed("voidp", i_iMAX)) {
  i_iMAX = callNamed("count", meProp(_me, "collisionObjects"));
  }

  for (var i = 1; i <= i_iMAX; ++i) {
  if ((lingoTruthy(lingoBinary("eq", callMethod("GetType", meProp(_me, "collisionObjects")[i]), symbol("static"))) ? 0 : 1)) {
  callMethod("setVelocityN", meProp(_me, "collisionObjects")[i], lingoBinary("add", meProp(_me, "collisionObjects")[i].velocity.x, lingoBinary("mul", i_direction.x, g)), lingoBinary("add", meProp(_me, "collisionObjects")[i].velocity.y, lingoBinary("mul", i_direction.y, g)))
  }

  }

}

