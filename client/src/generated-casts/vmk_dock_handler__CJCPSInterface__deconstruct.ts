// vmk_dock_handler.cct / CJCPSInterface / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_signUpBoard"))) ? 0 : 1)) {
  callNamed("releaseSprite", meProp(_me, "m_signUpBoard").spriteNum)
  }

  if (callNamed("windowExists", meProp(_me, "m_sSignupWndTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sSignupWndTitle"))
  }

  if (callNamed("windowExists", meProp(_me, "m_sHighscoreWindowTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sHighscoreWindowTitle"))
  }

  callNamed("unregisterMessage", symbol("room_ready"), callMethod("getID", _me))
  if (lingoBinary("neq", callNamed("getThread", "highscore"), 0)) {
  callNamed("DisableHighScore")
  }

  return 1;
}

