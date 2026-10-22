// vmk_pirates_game.cct / CPiratesVisualizerBase / SprZToScreenSpace

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SprZToScreenSpace(_me: LingoMe, a_ar_rSprites: LingoValue, a_iZLayer: LingoValue) {
  var tMyObject = callMethod("getObject", _me);
  var tPos = callMethod("GetParam", callMethod("getObject", _me), "WorldPosition");
  var tTestPos = callNamed("vector", lingoBinary("div", tPos.x, float(100)), lingoBinary("div", tPos.y, float(100)), lingoBinary("div", tPos.z, float(100)));
  callMethod("SetAbsPos", tMyObject, lingoBinary("add", tTestPos, callNamed("vector", 0, 0, a_iZLayer)))
  var tZ = callMethod("GetScrPos", tMyObject).z;
  for (var tSprite of a_ar_rSprites.toArray()) {
  setThePropOf(tSprite, "locZ", tZ);
  }

}

