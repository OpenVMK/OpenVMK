// vmk_hm_minigame.cct / CHMGameInterface / UnprepareInterface

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UnprepareInterface(_me: LingoMe) {
  setMeProp(_me, "m_prepared", 0);
  callMethod("HideIdleKickWarning", _me)
  callNamed("removeUpdate", callMethod("getID", _me))
  for (var i = 1; i <= meProp(_me, "m_ar_Windows").count; ++i) {
  var m_rWindow = meProp(_me, "m_ar_Windows")[i];
  if ((lingoTruthy(lingoBinary("eq", callMethod("getPropAt", meProp(_me, "m_ar_Windows"), i), "GameOver")) ? 0 : 1)) {
  if (callNamed("objectp", m_rWindow)) {
  callNamed("removeObject", callMethod("getID", m_rWindow))
  }

  }

  }

}

