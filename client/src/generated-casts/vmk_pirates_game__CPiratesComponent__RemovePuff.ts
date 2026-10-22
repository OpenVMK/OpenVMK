// vmk_pirates_game.cct / CPiratesComponent / RemovePuff

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemovePuff(_me: LingoMe, a_rPuff: LingoValue) {
  /* global */ var g_profComponent = globalVar("g_profComponent");
  callMethod("FreeObject", callMethod("GetObjectPool", meProp(_me, "m_rMGE")), a_rPuff)
}

