// eba88a10adbb7784498c2112110c5871.cct / NavigatorInterface Class / showhidenavigator

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showhidenavigator(_me: LingoMe) {
  if (callNamed("windowExists", meProp(_me, "m_windowTitle"))) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_windowTitle"));
  if (callMethod("getProperty", tWndObj, symbol("visible"))) {
  callNamed("removeWindow", callMethod("getID", tWndObj))
  callNamed("executeMessage", "SetButtonStates", new LingoPropList([symbol("all"), 1]))
  if (callNamed("windowExists", meProp(_me, "m_sAdvancedModeWindowTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sAdvancedModeWindowTitle"))
  }

  }

  } else {
  if ((lingoTruthy(callNamed("createWindow", meProp(_me, "m_windowTitle"), meProp(_me, "m_sWindowID"))) ? 0 : 1)) {
  return callNamed("error", _me, "Failed to create navigator window", symbol("showhidenavigator"));
  }

  setMeProp(_me, "m_merged", 0);
  tWndObj = callNamed("getWindow", meProp(_me, "m_windowTitle"));
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("eventProcNavigator"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("registerProcedure", tWndObj, symbol("eventProcNavigator"), callMethod("getID", _me), symbol("mouseEnter"))
  callMethod("registerProcedure", tWndObj, symbol("eventProcNavigator"), callMethod("getID", _me), symbol("mouseLeave"))
  callMethod("moveTo", tWndObj, 0, 0)
  callNamed("executeMessage", "SetButtonStates", new LingoPropList([symbol("all"), 0]))
  callNamed("executeMessage", "SetButtonStates", new LingoPropList([symbol("Messenger"), 1, symbol("navigator"), 1, symbol("settings"), 1, symbol("Help"), 1, symbol("exit"), 1]))
  var t_objRoom = callMethod("_AccessRoom", callNamed("getThread", symbol("room")).component);
  if (callNamed("objectp", t_objRoom)) {
  callMethod("setProperty", callMethod("getElement", tWndObj, "close"), symbol("visible"), 1)
  callMethod("setProperty", callMethod("getElement", tWndObj, "help"), symbol("visible"), 1)
  } else {
  callNamed("executeMessage", "SetButtonStates", new LingoPropList([symbol("navigator"), 0]))
  callMethod("setProperty", callMethod("getElement", tWndObj, "close"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", tWndObj, "help"), symbol("visible"), 0)
  }

  var t_bMusic = callMethod("get", callNamed("getObject", symbol("session")), "music");
  if (lingoBinary("and", (lingoTruthy(meProp(_me, "m_bSoundPlayed")) ? 0 : 1), t_bMusic)) {
  setMeProp(_me, "m_objSnd", callNamed("createObject", symbol("temp"), "CSoundObject"));
  callMethod("Define", meProp(_me, "m_objSnd"), "vmk-map-5")
  callMethod("SetSoundType", meProp(_me, "m_objSnd"), "ui")
  callMethod("PlaySound", meProp(_me, "m_objSnd"))
  setMeProp(_me, "m_bSoundPlayed", 1);
  }

  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 25)
  callNamed("executeMessage", "PlayInterfaceSound", "open-map")
  callMethod("RequestNavigationNodes", callMethod("getComponent", _me), meProp(_me, "m_page"))
  callMethod("RefreshContent", _me)
  callMethod("SetTabs", _me)
  callNamed("executeMessage", symbol("ui_Fastpass"))
  if (callMethod("get", callNamed("getObject", symbol("session")), "AdvNavigation")) {
  if (lingoBinary("eq", callMethod("getAdvancedModeWindow", _me), 0)) {
  callNamed("createWindow", meProp(_me, "m_sAdvancedModeWindowTitle"), "vmk_nav_advanced.window")
  tWndObj = callNamed("getWindow", meProp(_me, "m_sAdvancedModeWindowTitle"));
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("eventProcAdvNavigator"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("moveTo", tWndObj, 550, 50)
  callMethod("hide", tWndObj)
  } else {
  callMethod("show", callMethod("getAdvancedModeWindow", _me))
  }

  if (lingoBinary("neq", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_windowTitle")), "nav.advancedmode.off"), 0)) {
  callMethod("feedImage", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_windowTitle")), "nav.advancedmode.off"), callNamed("getMember", "button.checkbox.1").image)
  }

  } else {
  if (lingoBinary("neq", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_windowTitle")), "nav.advancedmode.off"), 0)) {
  callMethod("feedImage", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_windowTitle")), "nav.advancedmode.off"), callNamed("getMember", "button.checkbox.0").image)
  }

  }

  }

}

