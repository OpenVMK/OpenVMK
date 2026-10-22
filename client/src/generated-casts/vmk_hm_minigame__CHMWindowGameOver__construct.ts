// vmk_hm_minigame.cct / CHMWindowGameOver / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_sWindowName", "HMG Window Game Over");
  setMeProp(_me, "m_sHMGWindowResults", "HMG Window Results");
  setMeProp(_me, "m_ar_roundResults", new LingoList([]));
  setMeProp(_me, "m_iLastPurpleWins", 0);
  setMeProp(_me, "m_iLastGreenWins", 0);
  callNamed("registerMessage", symbol("room_leave"), callMethod("getID", _me), symbol("HideGameOverWindow"))
  return 1;
}

