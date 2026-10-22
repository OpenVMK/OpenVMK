// vmk_hm_overrides.cct / CHMWindowUI / InitWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function InitWindow(_me: LingoMe) {
  callNamed("createWindow", _me.m_sWindowName, "vmk_hm_ingameui.window")
  var tWndObj = callNamed("getWindow", _me.m_sWindowName);
  if ((lingoTruthy(callNamed("voidp", tWndObj)) ? 0 : 1)) {
  callMethod("moveTo", tWndObj, 61, 565)
  var m_rGameInterfaceWindow = tWndObj;
  } else {
  return callNamed("error", _me, "HMGWindow.UI: Unable to create window ", symbol("InitWindow"));
  }

  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("EventProc"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("registerProcedure", tWndObj, symbol("EventProc"), callMethod("getID", _me), symbol("keyDown"))
  callMethod("registerProcedure", tWndObj, symbol("EventProc"), callMethod("getID", _me), symbol("keyUp"))
  callMethod("hide", callMethod("getElement", tWndObj, "back"))
  callMethod("hide", callMethod("getElement", tWndObj, "time.red"))
  var t_num0 = callNamed("member", "hm_0");
  var t_num0b = callNamed("member", "hmb_0");
  callMethod("SetNumber", _me.m_rClient, _me.m_sWindowName, "score.green", t_num0)
  callMethod("SetNumber", _me.m_rClient, _me.m_sWindowName, "score.red", t_num0)
  callMethod("SetNumber", _me.m_rClient, _me.m_sWindowName, "time.green", callNamed("member", "time.green"))
  callMethod("SetNumber", _me.m_rClient, _me.m_sWindowName, "bg", callNamed("member", "hm_:"))
  callMethod("SetTimerDisplay", _me, 0)
  callMethod("setTeamScore", _me, symbol("purple"), 0)
  callMethod("setTeamScore", _me, symbol("green"), 0)
  if (lingoBinary("eq", _me.m_pCannedField, 0)) {
  setMeProp(_me, "m_pCannedField", callNamed("CreateCannedField", _me.m_sWindowName, "pirates.chat.field", callNamed("rgb", "#EFEFEF"), callNamed("rgb", 255, 0, 0)));
  if (lingoBinary("neq", _me.m_pCannedField, 0)) {
  callMethod("setAllowErrors", _me.m_pCannedField, 1)
  }

  }

  callMethod("setChattable", _me, 0)
  setThePropOf(_me, "m_bActive", 1);
}

