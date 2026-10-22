// vmk_casual_checkers.cct / CCheckersGameInterface / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  if (callNamed("DialogWindowExists", "CheckersIdleWarning")) {
  callNamed("removeDialogWindow", "CheckersIdleWarning")
  }

  if (callNamed("DialogWindowExists", "CheckersTricksUsedWarning")) {
  callNamed("removeDialogWindow", "CheckersTricksUsedWarning")
  }

  if (callNamed("objectExists", meProp(_me, "m_sSound"))) {
  callMethod("setLoopCount", callNamed("getObject", meProp(_me, "m_sSound")), 0)
  callMethod("StopSound", callNamed("getObject", meProp(_me, "m_sSound")))
  callNamed("removeObject", meProp(_me, "m_sSound"))
  }

  if (callNamed("objectExists", meProp(_me, "m_sIndicator"))) {
  callNamed("removeObject", meProp(_me, "m_sIndicator"))
  }

  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  callNamed("removeWindow", callMethod("getID", meProp(_me, "m_rWindow")))
  setMeProp(_me, "m_rWindow", undefined);
  }

  callNamed("unregisterMessage", "ResetRoomSound", callMethod("getID", _this))
  setMeProp(_me, "m_rEngine", undefined);
  setMeProp(_me, "m_iOwnPlayer", 0);
  return 1;
}

