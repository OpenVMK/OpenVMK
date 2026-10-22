// vmk_fireworks.cct / CFireworksMinigameHandler / OnEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OnEvent(_me: LingoMe, i_iEvent: LingoValue, i_ar_iData: LingoValue) {
  var tFireworks = callMethod("getComponent", callNamed("getThread", "Fireworks"));
  switch (i_iEvent) {
case 1:
  callMethod("EndGame", tFireworks)
  break;
  default:
  callNamed("put", "Unknown Fireworks Event")
  }

}

