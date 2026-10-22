// vmk_jungle_cruise.cct / CCollisionEngine / DetectCollisions

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DetectCollisions(_me: LingoMe) {
  for (var i = 1; i <= callNamed("count", meProp(_me, "collisionObjects")); ++i) {
  callMethod("reset", meProp(_me, "collisionObjects")[i])
  var keeptesting = 1;
  var tests = 0;
  while (keeptesting) {
  keeptesting = callMethod("Detect", _me, meProp(_me, "collisionObjects"), meProp(_me, "collisionObjects")[i]);
  callMethod("Response", _me, meProp(_me, "collisionObjects")[i], _me.bounce, _me.friction)
  tests = lingoBinary("add", tests, 1);
  if (lingoBinary("gte", tests, 5)) {
  keeptesting = 0;
  }

  }

  }

}

