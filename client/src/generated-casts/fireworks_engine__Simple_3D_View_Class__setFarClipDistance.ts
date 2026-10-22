// fireworks_engine.cct / Simple 3D View Class / setFarClipDistance

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setFarClipDistance(_me: LingoMe, d: LingoValue) {
  setMeProp(_me, "fViewFarClip", d);
}

