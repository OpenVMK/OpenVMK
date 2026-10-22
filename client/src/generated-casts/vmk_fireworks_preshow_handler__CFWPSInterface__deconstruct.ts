// vmk_fireworks_preshow_handler.cct / CFWPSInterface / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if (callNamed("windowExists", meProp(_me, "m_sTimerWindowTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sTimerWindowTitle"))
  }

  callNamed("removeWindow", meProp(_me, "m_sHighscoreWindowTitle"))
  callNamed("removeWindow", meProp(_me, "m_sSignupWindowTitle"))
  for (var tSprite of meProp(_me, "m_clickSprites").toArray()) {
  callNamed("releaseSprite", tSprite.spriteNum)
  }

  callNamed("removeUpdate", callMethod("getID", _me))
  callNamed("removeTimeout", "FWCountdown")
  callNamed("unregisterMessage", symbol("room_ready"), callMethod("getID", _me))
  return 1;
}

