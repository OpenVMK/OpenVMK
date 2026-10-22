// vmk_hm_minigame.cct / CHMGameComponent / openAllDoors

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function openAllDoors(_me: LingoMe) {
  for (var t_rDoor of meProp(_me, "m_ar_rDoors").toArray()) {
  callMethod("openDoor", t_rDoor)
  }

}

