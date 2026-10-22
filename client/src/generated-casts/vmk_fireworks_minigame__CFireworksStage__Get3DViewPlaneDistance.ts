// vmk_fireworks_minigame.cct / CFireworksStage / Get3DViewPlaneDistance

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Get3DViewPlaneDistance(_me: LingoMe) {
  return meProp(_me, "m_f3DViewPlaneDistance");
}

