// vmk_fireworks_preshow_handler.cct / CFWPSInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_clickSprites", new LingoList([]));
  setMeProp(_me, "m_bSignedUp", 0);
  setMeProp(_me, "m_bLastSignup", 0);
  setMeProp(_me, "m_iLastMode", undefined);
  var m_iWndMode = symbol("none");
  setMeProp(_me, "m_sTimerWindowTitle", "FWPSGameStatus");
  setMeProp(_me, "m_iTimeLeft", -float(1));
  setMeProp(_me, "m_sSignupWindowTitle", "FWPSSignUp");
  setMeProp(_me, "m_sInstructionsWindowTitle", "FWPSInstructions");
  setMeProp(_me, "m_iInstructionsCurrentPage", 0);
  setMeProp(_me, "m_sHighscoreWindowTitle", "FWPSHighScores");
  var t_iHMHelpPageCount = callNamed("value", callNamed("getText", "fwps.instructions.page.count"));
  if (lingoBinary("lte", t_iHMHelpPageCount, 0)) {
  t_iHMHelpPageCount = 4;
  }

  setMeProp(_me, "m_ar_mp_instructions", new LingoList([]));
  for (var i = 1; i <= t_iHMHelpPageCount; ++i) {
  var t_ar_instruction = new LingoPropList([]);
  t_ar_instruction[symbol("text")] = lingoBinary("join", "fwps.instructions.page.", i);
  t_ar_instruction[symbol("image")] = lingoBinary("join", "fwps.instructions.pic.page.", i);
  callMethod("append", meProp(_me, "m_ar_mp_instructions"), t_ar_instruction)
  }

  callNamed("receiveUpdate", callMethod("getID", _me))
  callNamed("registerMessage", symbol("room_ready"), callMethod("getID", _me), symbol("initSign"))
  return 1;
}

