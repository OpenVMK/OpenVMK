// vmk_hm_minigame.cct / CCollisionEngine / setActiveFloor

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setActiveFloor(_me: LingoMe, a_sFloorName: LingoValue) {
  setMeProp(_me, "m_sActiveFloor", a_sFloorName);
  setMeProp(_me, "m_ar_tiles2D", meProp(_me, "m_ar_floors")[meProp(_me, "m_sActiveFloor")]);
}

