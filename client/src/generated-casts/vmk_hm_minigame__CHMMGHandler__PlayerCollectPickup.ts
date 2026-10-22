// vmk_hm_minigame.cct / CHMMGHandler / PlayerCollectPickup

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlayerCollectPickup(_me: LingoMe, i_iPlayer: LingoValue, i_iPickup: LingoValue) {
  if (meProp(_me, "m_bDebugOut")) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "[HMDBG] Player", i_iPlayer), "collects pickup"), i_iPickup))
  }

  callNamed("executeMessage", "PlayInterfaceSound", "player-collect-pickup")
}

