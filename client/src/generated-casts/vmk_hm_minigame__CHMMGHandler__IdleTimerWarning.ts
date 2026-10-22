// vmk_hm_minigame.cct / CHMMGHandler / IdleTimerWarning

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function IdleTimerWarning(_me: LingoMe, i_iAvatarRef: LingoValue, i_iSecondsToKickOut: LingoValue) {
  if (meProp(_me, "m_bDebugOut")) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "[HMDBG] Player", i_iAvatarRef), "will be kicked out in"), i_iSecondsToKickOut), "seconds"))
  }

  var tPlayer = callMethod("GetMGObject", meProp(_me, "m_rGameEngine"), i_iAvatarRef);
  if (lingoBinary("eq", callMethod("GetName", callMethod("GetFactor", tPlayer)), callMethod("get", callNamed("getObject", symbol("session")), "name"))) {
  callMethod("ShowIdleKickWarning", meProp(_me, "m_rHauntedMansionInterface"), i_iSecondsToKickOut)
  }

}

