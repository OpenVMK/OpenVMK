// vmk_hm_minigame.cct / CHMGameComponent / PrepareRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PrepareRoom(_me: LingoMe) {
  callNamed("put", "CHMGameComponent::PrepareRoom - begin")
  setMeProp(_me, "m_iRound", 0);
  callNamed("executeMessage", symbol("ui_hide"))
  callNamed("executeMessage", symbol("MinigameState"), symbol("running"), "hauntedmansion")
  callMethod("set", callNamed("getObject", symbol("session")), "minigame", "hauntedmansion")
  callNamed("put", "Get Minigame Engine object")
  callNamed("initIntVector")
  setMeProp(_me, "m_rMGE", callMethod("getComponent", callNamed("getThread", "minigame")));
  callMethod("_SetTurnPulse", meProp(_me, "m_rMGE"), 0.3)
  callNamed("registerMessage", symbol("room_ready"), callMethod("getID", _me), symbol("InitGameEngine"))
  callNamed("registerMessage", symbol("room_leave"), callMethod("getID", _me), symbol("StopGameEngine"))
  setMeProp(_me, "m_rStage", undefined);
  callNamed("executeMessage", "StopRoomSound")
  callNamed("receiveUpdate", callMethod("getID", _me))
  callMethod("PrepareInterface", callMethod("getInterface", _me))
  setMeProp(_me, "m_bPrepared", 1);
  setMeProp(_me, "m_bGameOn", 0);
  if (meProp(_me, "m_bLeaveCalled")) {
  if (callNamed("connectionExists", callNamed("getVariable", "main.connection.id", "VMK"))) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 580)
  }

  } else {
  callNamed("put", "Avatar has not left the room yet, did not send 'start'")
  }

  callNamed("put", "CHMGameComponent::PrepareRoom - end")
}

