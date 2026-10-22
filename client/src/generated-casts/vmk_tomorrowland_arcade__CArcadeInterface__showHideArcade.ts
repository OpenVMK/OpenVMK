// vmk_tomorrowland_arcade.cct / CArcadeInterface / showHideArcade

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showHideArcade(_me: LingoMe) {
  if (callNamed("windowExists", meProp(_me, "m_sWindowID"))) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  if (callMethod("getProperty", tWndObj, symbol("visible"))) {
  callNamed("removeWindow", meProp(_me, "m_sWindowID"))
  }

  callMethod("removeFriendListUpdate", callMethod("getHandler", _me))
  } else {
  callNamed("createWindow", meProp(_me, "m_sWindowID"), "vmk_modal.window")
  tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("merge", tWndObj, "vmk_arcade_popup.window")
  callMethod("moveTo", tWndObj, 0, 0)
  callMethod("registerProcedure", tWndObj, symbol("eventProcArcade"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("startFriendListUpdate", callMethod("getHandler", _me))
  }

  callMethod("OpenArcade", _me)
}

