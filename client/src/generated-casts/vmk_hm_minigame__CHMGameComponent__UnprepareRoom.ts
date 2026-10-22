// vmk_hm_minigame.cct / CHMGameComponent / UnprepareRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UnprepareRoom(_me: LingoMe) {
  callNamed("put", "CHMGameComponent::UnprepareRoom - begin")
  callMethod("removeTileMover", _me)
  callNamed("executeMessage", symbol("ui_show"))
  callNamed("removeUpdate", callMethod("getID", _me))
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rStage"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rStage")))
  }

  callNamed("unregisterMessage", symbol("room_ready"), callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("room_leave"), callMethod("getID", _me))
  setMeProp(_me, "m_rStage", undefined);
  var m_prepared = 0;
  callMethod("StopMinigameEngine", meProp(_me, "m_rMGE"))
  callNamed("executeMessage", symbol("MinigameState"), symbol("idle"), "hauntedmansion")
  callMethod("set", callNamed("getObject", symbol("session")), "minigame", undefined)
  setMeProp(_me, "m_bGameOn", 0);
}

