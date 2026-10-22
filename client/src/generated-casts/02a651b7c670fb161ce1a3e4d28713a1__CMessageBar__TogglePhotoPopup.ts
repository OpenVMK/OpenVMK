// 02a651b7c670fb161ce1a3e4d28713a1.cct / CMessageBar / TogglePhotoPopup

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TogglePhotoPopup(_me: LingoMe) {
  if ((lingoTruthy(callNamed("windowExists", meProp(_me, "m_sPhotoPopupWndTitle"))) ? 0 : 1)) {
  if ((lingoTruthy(callNamed("createWindow", meProp(_me, "m_sPhotoPopupWndTitle"), "vmk_photo_popup.window")) ? 0 : 1)) {
  return callNamed("error", _me, "Failed to open photo popup window!!!", symbol("showMessageBar"));
  } else {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sPhotoPopupWndTitle"));
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("eventProcPhotoPopup"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("moveTo", tWndObj, 661, 500)
  callMethod("show", tWndObj)
  callNamed("executeMessage", "close_Magic")
  callNamed("executeMessage", "close_Emoticons")
  }

  } else {
  callNamed("removeWindow", meProp(_me, "m_sPhotoPopupWndTitle"))
  }

}

