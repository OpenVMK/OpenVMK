// minigame_engine_potc2.cct / CGameComponent / StartMinigameEngine

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StartMinigameEngine(_me: LingoMe) {
  /* global */ var g_profMGEngine = globalVar("g_profMGEngine");
  /* global */ var g_profMGEProcess = globalVar("g_profMGEProcess");
  setMeProp(_me, "m_rRoomContext", callMethod("_AccessRoom", callNamed("getObject", symbol("room_component"))));
  setMeProp(_me, "m_fTurnT", float(0));
  setMeProp(_me, "m_iLastMS", theProperty("milliSeconds"));
  setMeProp(_me, "m_iLastSubturn", -float(1));
  callNamed("initIntVector")
}

