// vmk_musicmix_handler.cct / CVMKMusicMixInterface / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("unregisterMessage", symbol("room_ready"), callMethod("getID", _me))
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_pTextScroller"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_pTextScroller")))
  }

  var t_title = "Music Player Popup";
  if (lingoBinary("neq", callNamed("getObject", t_title), 0)) {
  callNamed("removeObject", t_title)
  }

  if (callNamed("windowExists", meProp(_me, "m_sPopupWndTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sPopupWndTitle"))
  }

  return 1;
}

