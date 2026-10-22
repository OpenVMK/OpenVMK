// 02a651b7c670fb161ce1a3e4d28713a1.cct / CMessageBar / showMessageBar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showMessageBar(_me: LingoMe) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 767)
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWndTitle"));
  if ((lingoTruthy(callNamed("objectp", tWndObj)) ? 0 : 1)) {
  if ((lingoTruthy(callNamed("createWindow", meProp(_me, "m_sWndTitle"), "vmk_chatbar.window")) ? 0 : 1)) {
  return callNamed("error", _me, "Failed to open message bar window!!!", symbol("showMessageBar"));
  } else {
  tWndObj = callNamed("getWindow", meProp(_me, "m_sWndTitle"));
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("eventProcMessageBar"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("registerProcedure", tWndObj, symbol("eventProcMessageBar"), callMethod("getID", _me), symbol("keyDown"))
  callMethod("registerProcedure", tWndObj, symbol("eventProcMessageBar"), callMethod("getID", _me), symbol("keyUp"))
  callMethod("moveTo", tWndObj, 0, lingoBinary("sub", theProperty("stage").image.height, 28))
  setMeProp(_me, "m_bVisible", 1);
  }

  }

  if (lingoBinary("eq", meProp(_me, "m_pCannedField"), 0)) {
  setMeProp(_me, "m_pCannedField", callNamed("CreateCannedField", meProp(_me, "m_sWndTitle"), "chat.field", callNamed("rgb", "#EFEFEF"), callNamed("rgb", 255, 0, 0)));
  if (lingoBinary("neq", meProp(_me, "m_pCannedField"), 0)) {
  callMethod("setAllowErrors", meProp(_me, "m_pCannedField"), 1)
  }

  }

  if (lingoBinary("eq", theProperty("environment").productVersion, "10.2")) {
  if (lingoBinary("eq", theProperty("environment").productBuildVersion, "21")) {
  callNamed("receiveUpdate", callMethod("getID", _me))
  }

  }

}

