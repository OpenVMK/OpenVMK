// vmk_hm_minigame.cct / CHMMGHandler / CorrectExit

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CorrectExit(_me: LingoMe, i_iPlayerRef: LingoValue, i_iDoorRef: LingoValue) {
  if (meProp(_me, "m_bDebugOut")) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "[HMDBG] Player", i_iPlayerRef), "enters correct door"))
  }

  callNamed("executeMessage", "PlayInterfaceSound", "player-collect-pickup")
  var tOwnColor = 0;
  var tPlayerObjects = callMethod("GetObjectsByCode", meProp(_me, "m_rGameEngine"), 3);
  for (var tPlayer of tPlayerObjects.toArray()) {
  if (lingoBinary("eq", callMethod("GetName", callMethod("GetFactor", tPlayer)), callMethod("get", callNamed("getObject", symbol("session")), "name"))) {
  tOwnColor = callMethod("GetParam", tPlayer, "Team");
  break;
  }

  }

  var t_iColor = callMethod("GetParam", callMethod("GetMGObject", meProp(_me, "m_rGameEngine"), i_iPlayerRef), "Team");
  if (lingoBinary("eq", tOwnColor, t_iColor)) {
  callMethod("activateDoorVortex", meProp(_me, "m_rHauntedMansionEngine"), i_iDoorRef, t_iColor)
  }

  callMethod("setFoundExit", callMethod("GetFactor", callMethod("GetMGObject", meProp(_me, "m_rGameEngine"), i_iPlayerRef)), 1)
  callNamed("executeMessage", "StopRoomSound")
  callNamed("executeMessage", "LoadRoomSound", "hmg_doorraceend_")
}

