// fireworks_engine.cct / Clipping 3D Pipeline Class / new

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _new(_me: LingoMe) {
  setMeProp(_me, "view", callMethod("new", callNamed("script", "Simple 3D View Class")));
  return _me;
}

