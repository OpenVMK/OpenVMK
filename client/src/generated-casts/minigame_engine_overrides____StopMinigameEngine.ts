// minigame_engine_overrides.cct /  / StopMinigameEngine

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StopMinigameEngine(_me: LingoMe) {
  for (var tObject of _me.m_mp_objects.toArray()) {
  callMethod("_RemoveIndexed", _me.m_rRoomContext, callMethod("GetParam", tObject, "Reference"))
  }

  setThePropOf(_me, "m_mp_objects", callNamed("propList"));
  setThePropOf(_me, "m_ar_rMyObjects", new LingoList([]));
  setThePropOf(_me, "m_rRoomContext", undefined);
  setThePropOf(_me, "m_fTurnT", float(0));
  setThePropOf(_me, "m_iLastMS", theProperty("milliSeconds"));
  setThePropOf(_me, "m_iLastSubturn", -float(1));
  callMethod("_ClearCurrentTurn", _me)
  callMethod("_ClearTurnBuffer", _me)
}

