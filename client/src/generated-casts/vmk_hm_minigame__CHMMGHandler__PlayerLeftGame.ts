// vmk_hm_minigame.cct / CHMMGHandler / PlayerLeftGame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlayerLeftGame(_me: LingoMe, i_iPlayer: LingoValue, i_iVisibility: LingoValue) {
  if (meProp(_me, "m_bDebugOut")) {
  callNamed("put", lingoBinary("joinPad", "[HMDBG] Player Left Game", i_iPlayer))
  }

  callMethod("PlayerLeftGame", callMethod("GetFactor", callMethod("GetMGObject", meProp(_me, "m_rGameEngine"), i_iPlayer)), i_iVisibility)
}

