// vmk_pirates_minigame.cct / CPiratesComponent / PrepareRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PrepareRoom(_me: LingoMe) {
  /* global */ var g_profComponent = globalVar("g_profComponent");
  callNamed("initIntVector")
  callNamed("executeMessage", symbol("MinigameState"), symbol("running"))
  callMethod("PrepareRoom", callMethod("getInterface", _me))
  setMeProp(_me, "m_rMGE", callMethod("getComponent", callNamed("getThread", "minigame")));
  setMeProp(_me, "m_rFloatFactory", callNamed("createObject", "FloatFactory", "CFloatingTextFactory"));
  callNamed("registerMessage", symbol("room_ready"), callMethod("getID", _me), symbol("InitGameEngine"))
  callNamed("registerMessage", symbol("room_leave"), callMethod("getID", _me), symbol("StopGameEngine"))
  setMeProp(_me, "m_stage", undefined);
  setMeProp(_me, "m_gameInitialized", 0);
  setMeProp(_me, "m_myAvatarRef", 0);
  setMeProp(_me, "m_vWind", callNamed("intvector", 0, 0, 0));
  setMeProp(_me, "m_ar_puffs", new LingoList([]));
  setMeProp(_me, "m_iReferenceCounter", 0);
  setMeProp(_me, "m_iStageStartedAt", 0);
  setMeProp(_me, "m_iStageEndedAt", 0);
  setMeProp(_me, "m_ar_stagevictoryparams", new LingoList([]));
  setMeProp(_me, "m_ar_ar_dmgObjects", new LingoList([]));
  setMeProp(_me, "m_ar_ar_burnObjects", new LingoList([]));
  setMeProp(_me, "m_ar_buildingBounds", new LingoList([]));
  callNamed("executeMessage", "StopRoomSound")
  setMeProp(_me, "m_rSoundPlayer", callNamed("createObject", "PiratesSoundPlayer", "CPiratesSound"));
  callNamed("executeMessage", symbol("room_switch"), "pirates_game")
  callNamed("receiveUpdate", callMethod("getID", _me))
  callMethod("ShowPreGame", callMethod("getInterface", _me))
  callMethod("_Config", callMethod("getHandler", _me), 1)
  setMeProp(_me, "m_gameOn", 0);
  setMeProp(_me, "m_prepared", 1);
  if (callNamed("connectionExists", callNamed("getVariable", "main.connection.id", "VMK"))) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 580)
  }

}

