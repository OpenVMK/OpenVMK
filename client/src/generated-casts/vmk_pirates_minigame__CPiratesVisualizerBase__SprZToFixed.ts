// vmk_pirates_minigame.cct / CPiratesVisualizerBase / SprZToFixed

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SprZToFixed(_me: LingoMe, a_ar_rSprites: LingoValue, a_vRefPos: LingoValue) {
  var tMyObject = callMethod("getObject", _me);
  callMethod("SetAbsPos", tMyObject, a_vRefPos)
  var tZ = callMethod("GetScrPos", tMyObject).z;
  for (var tSprite of a_ar_rSprites.toArray()) {
  setThePropOf(tSprite, "locZ", tZ);
  }

}

