// vmk_hm_minigame.cct / CCollisionEngineBoundingTile / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("executeMessage", symbol("RemoveTileCollisionObject"), _me)
  if (meProp(_me, "m_bVisualizeBoundary")) {
  callNamed("removeMember", meProp(_me, "m_rSprite").member.name)
  callNamed("releaseSprite", meProp(_me, "m_rSprite").spriteNum)
  }

  return 1;
}

