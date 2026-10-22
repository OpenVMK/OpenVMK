// 02a651b7c670fb161ce1a3e4d28713a1.cct / CMessageBar / eventProcPhotoPopup

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcPhotoPopup(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sPhotoPopupWndTitle"));
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (tElemID) {
case "camera.takephoto.button":
  callNamed("executeMessage", symbol("ui_camera"))
  callMethod("TogglePhotoPopup", _me)
  break;
case "camera.opencatalog.button":
  callNamed("executeMessage", symbol("ui_photocatalog"))
  callMethod("TogglePhotoPopup", _me)
  break;
case "close":
  callMethod("TogglePhotoPopup", _me)
  break;
case "help":
  callNamed("executeMessage", symbol("open_help_page"), "help.stuff.camera")
  break;
  }

  }

}

