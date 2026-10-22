// vmk_furniture_code.cct / CRoomItemProximityConfig / hideTiles

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function hideTiles(_me: LingoMe) {
  while (lingoBinary("gt", meProp(_me, "m_ar_tiles").count, 0)) {
  var t_rTile = meProp(_me, "m_ar_tiles")[1];
  callNamed("releaseSprite", t_rTile[symbol("sprite")].spriteNum)
  callMethod("deleteAt", meProp(_me, "m_ar_tiles"), 1)
  }

  setMeProp(_me, "m_ar_tiles", new LingoList([]));
}

