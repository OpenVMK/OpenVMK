// vmk_hm_minigame.cct / CHMGameComponent / removeAllDoors

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removeAllDoors(_me: LingoMe) {
  for (var t_rDoor of meProp(_me, "m_ar_rDoors").toArray()) {
  callNamed("removeObject", callMethod("getID", t_rDoor))
  }

  setMeProp(_me, "m_ar_rDoors", new LingoPropList([]));
}

