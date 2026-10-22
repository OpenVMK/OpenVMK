// vmk_jungle_cruise.cct / CCollisionEngine / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("unregisterMessage", symbol("addCollisionObject"), callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("removeCollisionObject"), callMethod("getID", _me))
  callNamed("removeUpdate", callMethod("getID", _me))
  setMeProp(_me, "collisionMap", new LingoList([]));
  setMeProp(_me, "detectedCollisions", new LingoList([]));
  setMeProp(_me, "collisionObjects", new LingoList([]));
  return 1;
}

