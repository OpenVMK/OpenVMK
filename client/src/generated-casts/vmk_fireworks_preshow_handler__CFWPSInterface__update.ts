// vmk_fireworks_preshow_handler.cct / CFWPSInterface / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  var tGame = callMethod("GetGameByIndex", callMethod("getComponent", callNamed("getThread", "lobby")), 1);
  if ((lingoTruthy(callNamed("voidp", tGame)) ? 0 : 1)) {
  var tGameMode = callMethod("GetGameStatus", _me);
  if (lingoBinary("or", lingoBinary("neq", tGameMode, meProp(_me, "m_iLastMode")), lingoBinary("neq", meProp(_me, "m_bLastSignup"), meProp(_me, "m_bSignedUp")))) {
  callMethod("initSign", _me)
  }

  setMeProp(_me, "m_iLastMode", tGameMode);
  setMeProp(_me, "m_bLastSignup", meProp(_me, "m_bSignedUp"));
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sSignupWindowTitle"));
  if (lingoBinary("neq", tWndObj, 0)) {
  if (lingoBinary("eq", tGameMode, symbol("countdown"))) {
  if ((lingoTruthy(callNamed("timeoutExists", "FWCountdown")) ? 0 : 1)) {
  setMeProp(_me, "m_iTimeLeft", callMethod("GetParameterValue", tGame, "TimeLeft"));
  if (lingoBinary("neq", meProp(_me, "m_iTimeLeft"), 0)) {
  callNamed("createTimeout", "FWCountdown", 1000, symbol("dropasec"), callMethod("getID", _me), undefined, undefined)
  }

  }

  callMethod("setText", callMethod("getElement", tWndObj, "signup.gamestart.count"), callNamed("string", callNamed("integer", meProp(_me, "m_iTimeLeft"))))
  } else {
  if (lingoBinary("eq", tGameMode, symbol("waiting"))) {
  var tMinPlayers = callNamed("value", callMethod("GetParameterValue", tGame, "miu"));
  var tPlayersNeeded = lingoBinary("sub", tMinPlayers, callMethod("GetParameterValue", tGame, "NumParticipants"));
  callMethod("setText", callMethod("getElement", tWndObj, "signup.players.count"), callNamed("string", tPlayersNeeded))
  if (callNamed("timeoutExists", "FWCountdown")) {
  callMethod("DisableTimerWindow", _me)
  }

  }

  }

  }

  }

}

