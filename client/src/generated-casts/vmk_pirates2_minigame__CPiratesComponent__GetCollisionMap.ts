// vmk_pirates2_minigame.cct / CPiratesComponent / GetCollisionMap

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetCollisionMap(_me: LingoMe) {
  /* global */ var g_profComponent = globalVar("g_profComponent");
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_stage"))) ? 0 : 1)) {
  return callMethod("GetCollisionMap", meProp(_me, "m_stage"));
  } else {
  return undefined;
  }

}

