// eba88a10adbb7784498c2112110c5871.cct / NavigatorInterface Class / ShowAdvancedModeWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowAdvancedModeWindow(_me: LingoMe) {
  callNamed("executeMessage", "PlayInterfaceSound", "map-tab-change")
  callNamed("executeMessage", symbol("ui_Fastpass"))
  if (callNamed("windowExists", meProp(_me, "m_sAdvancedModeWindowTitle"))) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sAdvancedModeWindowTitle"));
  callMethod("show", tWndObj)
  var tWidth = callMethod("getProperty", tWndObj, symbol("width"));
  var tHeight = callMethod("getProperty", tWndObj, symbol("height"));
  var tWindowPos = lingoBinary("sub", theProperty("mouseLoc"), callNamed("point", lingoBinary("div", tWidth, 2), lingoBinary("div", tHeight, 2)));
  if (lingoBinary("lt", tWindowPos.locH, 0)) {
  setThePropOf(tWindowPos, "locH", 0);
  }

  if (lingoBinary("lt", tWindowPos.locV, 0)) {
  setThePropOf(tWindowPos, "locV", 0);
  }

  if (lingoBinary("gt", tWindowPos.locH, lingoBinary("sub", theProperty("stage").image.width, tWidth))) {
  setThePropOf(tWindowPos, "locH", lingoBinary("sub", theProperty("stage").image.width, tWidth));
  }

  if (lingoBinary("gt", tWindowPos.locV, lingoBinary("sub", theProperty("stage").image.height, tHeight))) {
  setThePropOf(tWindowPos, "locV", lingoBinary("sub", theProperty("stage").image.height, tHeight));
  }

  callNamed("activateWindow", callMethod("getID", tWndObj))
  callMethod("moveTo", tWndObj, tWindowPos.locH, tWindowPos.locV)
  } else {
  callNamed("createWindow", meProp(_me, "m_sAdvancedModeWindowTitle"), "vmk_nav_advanced.window")
  tWndObj = callNamed("getWindow", meProp(_me, "m_sAdvancedModeWindowTitle"));
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("eventProcAdvNavigator"), callMethod("getID", _me), symbol("mouseUp"))
  tWidth = callMethod("getProperty", tWndObj, symbol("width"));
  tHeight = callMethod("getProperty", tWndObj, symbol("height"));
  tWindowPos = lingoBinary("sub", theProperty("mouseLoc"), callNamed("point", lingoBinary("div", tWidth, 2), lingoBinary("div", tHeight, 2)));
  if (lingoBinary("lt", tWindowPos.locH, 0)) {
  setThePropOf(tWindowPos, "locH", 0);
  }

  if (lingoBinary("lt", tWindowPos.locV, 0)) {
  setThePropOf(tWindowPos, "locV", 0);
  }

  if (lingoBinary("gt", tWindowPos.locH, lingoBinary("sub", theProperty("stage").image.width, tWidth))) {
  setThePropOf(tWindowPos, "locH", lingoBinary("sub", theProperty("stage").image.width, tWidth));
  }

  if (lingoBinary("gt", tWindowPos.locV, lingoBinary("sub", theProperty("stage").image.height, tHeight))) {
  setThePropOf(tWindowPos, "locV", lingoBinary("sub", theProperty("stage").image.height, tHeight));
  }

  callMethod("moveTo", tWndObj, tWindowPos.locH, tWindowPos.locV)
  }

}

