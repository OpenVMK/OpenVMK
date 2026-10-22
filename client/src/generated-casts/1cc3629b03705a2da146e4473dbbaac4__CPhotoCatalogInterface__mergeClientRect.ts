// 1cc3629b03705a2da146e4473dbbaac4.cct / CPhotoCatalogInterface / mergeClientRect

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function mergeClientRect(_me: LingoMe, tWndObj: LingoValue) {
  if (lingoBinary("eq", meProp(_me, "m_view"), symbol("thumbs"))) {
  if ((lingoTruthy(callMethod("merge", tWndObj, "vmk_fto_catalog_thumbs.window")) ? 0 : 1)) {
  return callNamed("error", _me, "Could not merge 2nd layer client rect", symbol("showHidePhotoCatalog"));
  }

  var tDisplay = callMethod("getElement", tWndObj, "fto.thumbs.grid");
  setMeProp(_me, "m_iDefaultWidth", callMethod("getProperty", tDisplay, symbol("width")));
  setMeProp(_me, "m_iDefaultHeight", callMethod("getProperty", tDisplay, symbol("height")));
  setMeProp(_me, "m_bMerged", 1);
  }

  if (lingoBinary("eq", meProp(_me, "m_view"), symbol("Full"))) {
  if ((lingoTruthy(callMethod("merge", tWndObj, "vmk_fto_catalog_view.window")) ? 0 : 1)) {
  return callNamed("error", _me, "Could not merge 2nd layer client rect", symbol("showHidePhotoCatalog"));
  }

  setMeProp(_me, "m_bMerged", 1);
  if (lingoBinary("eq", meProp(_me, "m_pCannedField"), 0)) {
  setMeProp(_me, "m_pCannedField", callNamed("CreateCannedField", meProp(_me, "m_sWindowTitle"), "camera.caption.input", callNamed("rgb", "#000000"), callNamed("rgb", "#FF0000")));
  if (lingoBinary("neq", meProp(_me, "m_pCannedField"), 0)) {
  callMethod("setAllowErrors", meProp(_me, "m_pCannedField"), 1)
  }

  }

  if ((lingoTruthy(callMethod("get", callNamed("getObject", "session"), "ControlRoom")) ? 0 : 1)) {
  callMethod("hide", callMethod("getElement", tWndObj, "fto.placeonwall.button"))
  }

  var tRoomMode = callMethod("getRoomMode", callMethod("getComponent", callNamed("getThread", "RoomInfo")));
  if (lingoBinary("eq", tRoomMode, "public")) {
  callMethod("hide", callMethod("getElement", tWndObj, "fto.placeonwall.button"))
  }

  }

}

