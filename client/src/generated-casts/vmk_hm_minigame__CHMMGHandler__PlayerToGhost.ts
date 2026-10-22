// vmk_hm_minigame.cct / CHMMGHandler / PlayerToGhost

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlayerToGhost(_me: LingoMe, i_iPlayer: LingoValue) {
  if (meProp(_me, "m_bDebugOut")) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "[HMDBG] Player", i_iPlayer), "transforms to ghost"))
  }

  callMethod("Possess", callMethod("GetFactor", callMethod("GetMGObject", meProp(_me, "m_rGameEngine"), i_iPlayer)))
  callNamed("executeMessage", "PlayInterfaceSound", "player-into-ghost")
  var tPlayer = callMethod("GetMGObject", meProp(_me, "m_rGameEngine"), i_iPlayer);
  if (lingoBinary("eq", callMethod("GetName", callMethod("GetFactor", tPlayer)), callMethod("get", callNamed("getObject", symbol("session")), "name"))) {
  callMethod("stopAction", meProp(_me, "m_rHauntedMansionInterface"))
  }

}

