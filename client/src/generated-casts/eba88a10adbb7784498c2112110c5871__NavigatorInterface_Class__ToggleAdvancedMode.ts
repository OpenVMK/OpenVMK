// eba88a10adbb7784498c2112110c5871.cct / NavigatorInterface Class / ToggleAdvancedMode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ToggleAdvancedMode(_me: LingoMe) {
  var t_advancedMode = (lingoTruthy(callMethod("get", callNamed("getObject", symbol("session")), "AdvNavigation")) ? 0 : 1);
  callMethod("set", callNamed("getObject", symbol("session")), "AdvNavigation", t_advancedMode)
  if (lingoBinary("neq", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_windowTitle")), "nav.advancedmode.off"), 0)) {
  if (t_advancedMode) {
  callMethod("feedImage", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_windowTitle")), "nav.advancedmode.off"), callNamed("getMember", "button.checkbox.1").image)
  } else {
  callMethod("feedImage", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_windowTitle")), "nav.advancedmode.off"), callNamed("getMember", "button.checkbox.0").image)
  if (callNamed("windowExists", meProp(_me, "m_sAdvancedModeWindowTitle"))) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sAdvancedModeWindowTitle"));
  callMethod("hide", tWndObj)
  }

  }

  }

}

