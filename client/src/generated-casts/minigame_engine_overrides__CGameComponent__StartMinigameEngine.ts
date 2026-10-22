// minigame_engine_overrides.cct / CGameComponent / StartMinigameEngine

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StartMinigameEngine(_me: LingoMe) {
  setThePropOf(_me, "m_rRoomContext", callMethod("_AccessRoom", callNamed("getObject", symbol("room_component"))));
  setThePropOf(_me, "m_fTurnT", float(0));
  setThePropOf(_me, "m_iLastMS", theProperty("milliSeconds"));
  setThePropOf(_me, "m_iLastSubturn", -float(1));
  callNamed("initIntVector")
}

