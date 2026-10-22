// vmk_fireworks_preshow_handler.cct / CFWPSInterface / eventProcFWPS

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcFWPS(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  callMethod("deactivate", callNamed("getWindowManager"), meProp(_me, "m_sSignupWindowTitle"))
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (tElemID) {
case "fw.signup.play":
  callNamed("executeMessage", "PlayInterfaceSound", "fireworks-UI-3")
  setMeProp(_me, "m_bSignedUp", 1);
  callMethod("SetReadyToPlayState", callMethod("getComponent", callNamed("getThread", "lobby")), 1)
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sSignupWindowTitle"));
  break;
case "fw.signup.leave":
  callNamed("executeMessage", "PlayInterfaceSound", "fireworks-UI-1")
  callMethod("SetReadyToPlayState", callMethod("getComponent", callNamed("getThread", "lobby")), 0)
  callMethod("DisableTimerWindow", _me)
  break;
case "fw.signup.highscores":
  callNamed("executeMessage", "PlayInterfaceSound", "fireworks-UI-3")
  if ((lingoTruthy(callNamed("createWindow", meProp(_me, "m_sHighscoreWindowTitle"), "vmk_fw_window.window")) ? 0 : 1)) {
  return callNamed("error", _me, "Failed to create highscore window!", symbol("eventProcFWPS"));
  }

  tWndObj = callNamed("getWindow", meProp(_me, "m_sHighscoreWindowTitle"));
  if ((lingoTruthy(callMethod("merge", tWndObj, "vmk_highscores.window")) ? 0 : 1)) {
  return callNamed("error", _me, "Failed to merge highscores window!", symbol("eventProcFWPS"));
  }

  callNamed("DisplayHighscore", 1, callMethod("getElement", tWndObj, "highscores"), callNamed("rgb", "#EFEFEF"))
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("HighScoreWndEventProc"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("setText", callMethod("getElement", tWndObj, "fw.dialog.hd"), callNamed("getText", "fwps.highscore.title"))
  callMethod("fixAntiAliasing", _me, tWndObj, "fw.dialog.hd")
  break;
case "fw.signup.instructions":
  callNamed("executeMessage", "PlayInterfaceSound", "fireworks-UI-1")
  if ((lingoTruthy(callNamed("createWindow", meProp(_me, "m_sInstructionsWindowTitle"), "vmk_fw_window.window")) ? 0 : 1)) {
  return callNamed("error", _me, "Failed to create instructions window!", symbol("eventProcInstructionsWindow"));
  }

  tWndObj = callNamed("getWindow", meProp(_me, "m_sInstructionsWindowTitle"));
  if ((lingoTruthy(callMethod("merge", tWndObj, "vmk_fw_instructions.window")) ? 0 : 1)) {
  return callNamed("error", _me, "Failed to merge instructions window!", symbol("eventProcInstructionsWindow"));
  }

  setMeProp(_me, "m_iInstructionsCurrentPage", 1);
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("eventProcInstructionsWindow"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("setText", callMethod("getElement", tWndObj, "fw.dialog.hd"), callNamed("getText", "fwps.instructions.title"))
  callMethod("fixAntiAliasing", _me, tWndObj, "fw.dialog.hd")
  callMethod("RenderInstructions", _me)
  break;
  }

  }

}

