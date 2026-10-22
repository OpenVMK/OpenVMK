// vmk_tutorial.cct / CJungleCruiseFactorAnimal / collisionNotification

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function collisionNotification(_me: LingoMe, _type: LingoValue) {
  switch (_type) {
case symbol("circle"):
  callMethod("leave", _me)
  break;
case symbol("edge"):
  break;
  default:
  callNamed("put", "Animal had an unknown collision")
  }

}

