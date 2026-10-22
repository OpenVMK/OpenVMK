// 239fb1d2675fc448140198b03238814c.cct / CLoginWindow / showLoginWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showLoginWindow(_me: LingoMe) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_windowTitle"));
  if ((lingoTruthy(callNamed("objectp", tWndObj)) ? 0 : 1)) {
  if ((lingoTruthy(callNamed("createWindow", meProp(_me, "m_windowTitle"), undefined, 0, 0, symbol("modal"))) ? 0 : 1)) {
  return callNamed("error", _me, "Failed to open login window!!!", symbol("showLoginWindow"));
  } else {
  tWndObj = callNamed("getWindow", meProp(_me, "m_windowTitle"));
  callMethod("merge", tWndObj, "vmk_modal.window")
  callMethod("merge", tWndObj, "vmk_login.window")
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("eventProcLogin"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("registerProcedure", tWndObj, symbol("eventProcLogin"), callMethod("getID", _me), symbol("keyDown"))
  callMethod("center", tWndObj)
  var tField = callMethod("getElement", tWndObj, "login");
  callMethod("setFocus", tField, 1)
  var t_rElem = callMethod("getElement", tWndObj, "basic.window.title");
  if (lingoBinary("neq", t_rElem, 0)) {
  callMethod("setText", t_rElem, callNamed("getText", "virtual_magic_kingdom", "Login"))
  }

  if (lingoBinary("or", lingoBinary("eq", theProperty("runMode"), "Author"), lingoBinary("eq", theProperty("runMode"), "Projector"))) {
  var t_sName = callNamed("getPref", "vmk_cached_name");
  if (callNamed("stringp", t_sName)) {
  callMethod("setText", callMethod("getElement", tWndObj, "login"), t_sName)
  }

  var t_sPass = callNamed("getPref", "vmk_cached_pass");
  if (callNamed("stringp", t_sPass)) {
  setMeProp(_me, "pTempPassword", new LingoList([]));
  for (var i = 1; i <= t_sPass.char.count; ++i) {
  callMethod("append", meProp(_me, "pTempPassword"), t_sPass.char[i])
  }

  callMethod("updatePassword", _me)
  }

  callMethod("setButtonState", _me, "send_login", 0)
  }

  }

  }

}

