// vmk_hm_minigame.cct / CCollisionEngineControlledTile / collisionNotification

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function collisionNotification(_me: LingoMe, _type: LingoValue, _collisionType: LingoValue, _collisionObject: LingoValue) {
  var tSpeed = callMethod("length", meProp(_me, "m_ar_BoundingObjects")[1].velocity);
  switch (_type) {
case symbol("circle"):
  break;
case symbol("edge"):
  break;
  }

}

