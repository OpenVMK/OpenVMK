// vmk_hm_minigame.cct / CHMMGHandler / SuperGhostCatchPlayer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SuperGhostCatchPlayer(_me: LingoMe, i_iPlayer: LingoValue) {
  if (meProp(_me, "m_bDebugOut")) {
  callNamed("put", lingoBinary("joinPad", "[HMDBG] Super ghost catches player", i_iPlayer))
  }

  callMethod("SuperGhostPossess", callMethod("GetFactor", callMethod("GetMGObject", meProp(_me, "m_rGameEngine"), i_iPlayer)))
  callNamed("executeMessage", "PlayInterfaceSound", "superghost-catches-player")
  callNamed("executeMessage", "StopRoomSound")
  callNamed("executeMessage", "LoadRoomSound", "hmg_doorraceend_")
}

