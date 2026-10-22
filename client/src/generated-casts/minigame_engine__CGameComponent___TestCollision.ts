// minigame_engine.cct / CGameComponent / _TestCollision

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _TestCollision(_me: LingoMe, i_rObject1: LingoValue, i_rObject2: LingoValue) {
  /* global */ var g_profMGEngine = globalVar("g_profMGEngine");
  /* global */ var g_profMGEProcess = globalVar("g_profMGEProcess");
  return callMethod("testForObjectToObjectCollision", meProp(_me, "m_rCollision"), i_rObject1, i_rObject2);
}

