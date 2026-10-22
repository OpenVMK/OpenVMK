// fireworks_engine.cct / Simple 3D View Class / setNearClipDistance

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setNearClipDistance(_me: LingoMe, d: LingoValue) {
  setMeProp(_me, "fViewNearClip", d);
}

