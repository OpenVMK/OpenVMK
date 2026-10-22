// vmk_hm_minigame.cct / CCollisionEngine / SetTileSize

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetTileSize(_me: LingoMe, i_iTileSize: LingoValue) {
  setMeProp(_me, "m_iTileSize", i_iTileSize);
}

