// vmk_fireworks_preshow_handler.cct / CFWPSInterface / initSign

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initSign(_me: LingoMe) {
  if ((lingoTruthy(callMethod("IsDisabled", callMethod("getComponent", _me))) ? 0 : 1)) {
  if ((lingoTruthy(callNamed("windowExists", meProp(_me, "m_sSignupWindowTitle"))) ? 0 : 1)) {
  callNamed("createWindow", meProp(_me, "m_sSignupWindowTitle"), "vmk_fw_signup.window")
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sSignupWindowTitle"));
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("eventProcFWPS"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("moveTo", tWndObj, 367, 234)
  }

  tWndObj = callNamed("getWindow", meProp(_me, "m_sSignupWindowTitle"));
  if ((lingoTruthy(meProp(_me, "m_bSignedUp")) ? 0 : 1)) {
  callMethod("show", callMethod("getElement", tWndObj, "fw.signup.play"))
  } else {
  callMethod("hide", callMethod("getElement", tWndObj, "fw.signup.play"))
  }

  var tGameMode = callMethod("GetGameStatus", _me);
  if (lingoBinary("eq", tGameMode, symbol("waiting"))) {
  callMethod("hide", callMethod("getElement", tWndObj, "signup.gamestart.text1"))
  callMethod("hide", callMethod("getElement", tWndObj, "signup.gamestart.text2"))
  callMethod("hide", callMethod("getElement", tWndObj, "signup.gamestart.count"))
  callMethod("show", callMethod("getElement", tWndObj, "signup.players.text1"))
  callMethod("show", callMethod("getElement", tWndObj, "signup.players.text2"))
  callMethod("show", callMethod("getElement", tWndObj, "signup.players.count"))
  } else {
  if (lingoBinary("eq", tGameMode, symbol("countdown"))) {
  callMethod("show", callMethod("getElement", tWndObj, "signup.gamestart.text1"))
  callMethod("show", callMethod("getElement", tWndObj, "signup.gamestart.text2"))
  callMethod("show", callMethod("getElement", tWndObj, "signup.gamestart.count"))
  callMethod("hide", callMethod("getElement", tWndObj, "signup.players.text1"))
  callMethod("hide", callMethod("getElement", tWndObj, "signup.players.text2"))
  callMethod("hide", callMethod("getElement", tWndObj, "signup.players.count"))
  }

  }

  callMethod("deactivate", callNamed("getWindowManager"), meProp(_me, "m_sSignupWindowTitle"))
  }

}

