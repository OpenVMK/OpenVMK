// 6f0542e8885a8074c087cc89ca510672.cct / CTutorialHandler / ListenToSettings

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ListenToSettings(_me: LingoMe) {
  if ((lingoTruthy(callMethod("actionTaken", callMethod("getComponent", _me), "tutorial.settings.open")) ? 0 : 1)) {
  callMethod("takeAction", callMethod("getComponent", _me), "tutorial.settings.open")
  }

}

