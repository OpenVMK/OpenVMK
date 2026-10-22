// vmk_hm_minigame.cct / CHMGameInterface / startAction

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function startAction(_me: LingoMe) {
  callNamed("executeMessage", "PlayInterfaceSound", "vacuumcleaner-is-used")
  callNamed("removeTimeout", "hmg_stop_action")
  callNamed("createTimeout", "hmg_stop_action", 1000, symbol("stopAction"), callMethod("getID", _me), undefined, 1)
  if ((lingoTruthy(meProp(_me, "m_bActionActive")) ? 0 : 1)) {
  callNamed("executeMessage", symbol("SendMinigameAction"), 2, new LingoList([]))
  }

  setMeProp(_me, "m_bActionActive", 1);
}

