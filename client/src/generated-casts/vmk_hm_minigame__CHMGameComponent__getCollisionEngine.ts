// vmk_hm_minigame.cct / CHMGameComponent / getCollisionEngine

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getCollisionEngine(_me: LingoMe) {
  callMethod("getCollisionEngine", meProp(_me, "m_rStage"))
}

