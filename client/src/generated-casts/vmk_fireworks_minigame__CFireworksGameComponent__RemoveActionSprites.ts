// vmk_fireworks_minigame.cct / CFireworksGameComponent / RemoveActionSprites

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemoveActionSprites(_me: LingoMe) {
  if ((lingoTruthy(callNamed("voidp", callMethod("getInterface", _me))) ? 0 : 1)) {
  for (var i = 1; i <= callMethod("getFireWorksActionSprites", callMethod("getInterface", _me)).count; ++i) {
  callMethod("setFireworksActionSprite", callMethod("getInterface", _me), i, callNamed("point", -float(1000), -float(1000)), undefined, 0)
  }

  }

}

