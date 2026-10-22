// vmk_tutorial.cct / CBoundingCircle / collisionNotification

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function collisionNotification(_me: LingoMe, _type: LingoValue, i_bIwashit: LingoValue, i_rCollisionObject: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_iClientID"))) ? 0 : 1)) {
  var passEvent = 1;
  var tObject = meProp(_me, "m_iClientID");
  if (callNamed("voidp", tObject)) {
  passEvent = 0;
  } else {
  if (lingoBinary("eq", callMethod("getOne", callMethod("handlers", tObject), symbol("collisionNotification")), 0)) {
  passEvent = 0;
  }

  }

  if (passEvent) {
  callNamed("call", symbol("collisionNotification"), tObject, _type, i_bIwashit, i_rCollisionObject)
  }

  } else {
  callNamed("put", "Bounding Circle collision detected, not passing further down the pipe")
  }

}

