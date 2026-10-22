// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpContent / setTopic

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setTopic(_me: LingoMe, _topic: LingoValue) {
  setMeProp(_me, "pTopic", _topic);
}

