// vmk_minigame.cct / CGameComponent / StopMinigameEngine

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StopMinigameEngine(_me: LingoMe) {
  /* global */ var g_profMGEngine = globalVar("g_profMGEngine");
  /* global */ var g_profMGEProcess = globalVar("g_profMGEProcess");
  for (var tObject of meProp(_me, "m_mp_objects").toArray()) {
  callMethod("_RemoveIndexed", meProp(_me, "m_rRoomContext"), callMethod("GetParam", tObject, "Reference"))
  }

  setMeProp(_me, "m_mp_objects", new LingoPropList([]));
  setMeProp(_me, "m_ar_rMyObjects", new LingoList([]));
  setMeProp(_me, "m_rRoomContext", undefined);
  setMeProp(_me, "m_fTurnT", float(0));
  setMeProp(_me, "m_iLastMS", theProperty("milliSeconds"));
  setMeProp(_me, "m_iLastSubturn", -float(1));
  callMethod("_ClearCurrentTurn", _me)
  callMethod("_ClearTurnBuffer", _me)
}

