// vmk_casual_checkers.cct / CCheckersGameAllowedTileIndicator / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  callNamed("unregisterMessage", "room_tile_selection", callMethod("getID", _this))
  if (lingoBinary("eq", callNamed("ilk", meProp(_me, "m_rSprite")), symbol("sprite"))) {
  if (lingoBinary("gt", meProp(_me, "m_rSprite").spriteNum, 0)) {
  callNamed("releaseSprite", meProp(_me, "m_rSprite").spriteNum)
  setMeProp(_me, "m_rSprite", undefined);
  }

  }

  setMeProp(_me, "m_rGameEngine", undefined);
  setMeProp(_me, "m_rMember", undefined);
  setMeProp(_me, "m_rTile", undefined);
  setMeProp(_me, "m_rPiece", undefined);
  return 1;
}

