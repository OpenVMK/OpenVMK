// vmk_hm_minigame.cct / CHMStage / startSound

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function startSound(_me: LingoMe) {
  callNamed("executeMessage", "StopRoomSound")
  callNamed("executeMessage", "LoadRoomSound", meProp(_me, "m_sMusicName"))
}

