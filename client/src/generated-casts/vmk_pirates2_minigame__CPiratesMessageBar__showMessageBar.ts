// vmk_pirates2_minigame.cct / CPiratesMessageBar / showMessageBar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showMessageBar(_me: LingoMe) {
  setMeProp(_me, "m_iGameMode", callMethod("GetGameMode", callMethod("getComponent", callNamed("getThread", "piratesminigame"))));
  callNamed("put", lingoBinary("joinPad", "Choose Message Bar", meProp(_me, "m_iGameMode")))
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWndTitle"));
  if ((lingoTruthy(callNamed("objectp", tWndObj)) ? 0 : 1)) {
  switch (meProp(_me, "m_iGameMode")) {
case 1:
  var t_sWindow = "vmk_pirates_ui_ctf.window";
  break;
case 2:
  t_sWindow = "vmk_pirates_ui_lms.window";
  break;
  default:
  t_sWindow = "vmk_pirates_ui.window";
  }

  if ((lingoTruthy(callNamed("createWindow", meProp(_me, "m_sWndTitle"), t_sWindow)) ? 0 : 1)) {
  return callNamed("error", _me, "Failed to open message bar window!!!", symbol("showMessageBar"));
  } else {
  tWndObj = callNamed("getWindow", meProp(_me, "m_sWndTitle"));
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("eventProcPiratesMessageBar"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("registerProcedure", tWndObj, symbol("eventProcPiratesMessageBar"), callMethod("getID", _me), symbol("keyDown"))
  callMethod("registerProcedure", tWndObj, symbol("eventProcPiratesMessageBar"), callMethod("getID", _me), symbol("keyUp"))
  callMethod("center", tWndObj)
  setMeProp(_me, "m_bVisible", 1);
  var tElement = callMethod("getElement", tWndObj, "pirates.chat.field");
  setMeProp(_me, "m_colorInput", tElement.pMember.color);
  var m_colorBgr = callMethod("getProperty", tElement, symbol("bgColor"));
  }

  }

  if (lingoBinary("eq", meProp(_me, "m_pCannedField"), 0)) {
  setMeProp(_me, "m_pCannedField", callNamed("CreateCannedField", meProp(_me, "m_sWndTitle"), "pirates.chat.field", callNamed("rgb", "#EFEFEF"), callNamed("rgb", 255, 0, 0)));
  if (lingoBinary("neq", meProp(_me, "m_pCannedField"), 0)) {
  callMethod("setAllowErrors", meProp(_me, "m_pCannedField"), 1)
  }

  }

  callMethod("enableExitButton", _me, 0)
  callMethod("setRedScore", _me, 0, 0)
  callMethod("setBlueScore", _me, 0, 0)
}

