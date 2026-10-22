// d0e535313898676eb605277339b50f27.cct / CEmoticons / showHideEmoticons

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showHideEmoticons(_me: LingoMe, _this: LingoValue) {
  if (callNamed("windowExists", meProp(_me, "m_sWindowID"))) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  if (callMethod("getProperty", tWndObj, symbol("visible"))) {
  callMethod("_Close", _this)
  }

  } else {
  callNamed("executeMessage", "close_Magic")
  callNamed("executeMessage", symbol("hide_roominfo"))
  callNamed("executeMessage", symbol("hide_camera"))
  callNamed("createWindow", meProp(_me, "m_sWindowID"), "vmk_popup.window")
  var t_rWnd = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  callMethod("merge", t_rWnd, "vmk_popup_emoticons.window")
  callMethod("moveTo", t_rWnd, 175, 474)
  callMethod("registerClient", t_rWnd, callMethod("getID", _this))
  callMethod("registerProcedure", t_rWnd, symbol("eventProcEmoticons"), callMethod("getID", _this), symbol("mouseUp"))
  callMethod("registerProcedure", t_rWnd, symbol("eventProcEmoticons"), callMethod("getID", _this), symbol("mouseDown"))
  callMethod("render", meProp(_me, "m_rGrid"), meProp(_me, "m_ar_EmotList"), callMethod("getElement", t_rWnd, "emoticons.grid"))
  if (callMethod("elementExists", t_rWnd, "popup.hd")) {
  var t_sTxt = callNamed("getText", "emoticon.wnd.name");
  callMethod("setText", callMethod("getElement", t_rWnd, "popup.hd"), t_sTxt)
  }

  if (meProp(_me, "m_bDanceBtnState")) {
  callMethod("EnableDanceButton", _this)
  } else {
  callMethod("DisableDanceButton", _this)
  }

  }

}

