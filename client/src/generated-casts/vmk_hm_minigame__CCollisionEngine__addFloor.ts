// vmk_hm_minigame.cct / CCollisionEngine / addFloor

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addFloor(_me: LingoMe, i_ar_floor: LingoValue, i_sFloorName: LingoValue) {
  callNamed("m_ar_floor", lingoBinary("eq", new LingoList([i_sFloorName]), i_ar_floor))
}

