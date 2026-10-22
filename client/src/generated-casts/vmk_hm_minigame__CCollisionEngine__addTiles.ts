// vmk_hm_minigame.cct / CCollisionEngine / addTiles

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addTiles(_me: LingoMe, i_ar_tiles: LingoValue) {
  for (var t_vTile of i_ar_tiles.toArray()) {
  callMethod("addTile", _me, t_vTile)
  }

}

