// vmk_hm_minigame.cct / CCollisionEngine / addTile

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addTile(_me: LingoMe, i_vPos: LingoValue) {
  callMethod("add", meProp(_me, "m_ar_tiles2D"), i_vPos)
}

