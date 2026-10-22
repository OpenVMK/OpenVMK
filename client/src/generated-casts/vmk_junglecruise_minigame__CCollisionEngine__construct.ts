// vmk_junglecruise_minigame.cct / CCollisionEngine / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "collisionMap", new LingoList([]));
  setMeProp(_me, "detectedCollisions", new LingoList([]));
  setMeProp(_me, "collisionObjects", new LingoList([]));
  setMeProp(_me, "bounce", 0.5);
  setMeProp(_me, "friction", 0.1);
  callNamed("receiveUpdate", callMethod("getID", _me))
  callNamed("registerMessage", symbol("addCollisionObject"), callMethod("getID", _me), symbol("addCollisionObject"))
  callNamed("registerMessage", symbol("removeCollisionObject"), callMethod("getID", _me), symbol("removeCollisionObject"))
  return 1;
}

