// 6f0542e8885a8074c087cc89ca510672.cct / CTutorialHandler / shortcutnavigate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function shortcutnavigate(_me: LingoMe) {
  callMethod("shortcutnavigate", callMethod("getComponent", _me))
}

