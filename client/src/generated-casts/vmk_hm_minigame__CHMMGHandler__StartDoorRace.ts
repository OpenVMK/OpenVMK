// vmk_hm_minigame.cct / CHMMGHandler / StartDoorRace

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StartDoorRace(_me: LingoMe) {
  callMethod("ShowWindow", meProp(_me, "m_rHauntedMansionInterface"), "Notice", "door race")
  callNamed("executeMessage", "PlayInterfaceSound", "doors-open")
  callMethod("openAllDoors", meProp(_me, "m_rHauntedMansionEngine"))
  callNamed("executeMessage", "StopRoomSound")
  callNamed("executeMessage", "LoadRoomSound", "hmg_doorrace_")
}

