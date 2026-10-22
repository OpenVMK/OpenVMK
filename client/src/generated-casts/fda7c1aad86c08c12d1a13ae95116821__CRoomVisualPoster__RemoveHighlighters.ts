// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualPoster / RemoveHighlighters

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemoveHighlighters(_me: LingoMe, _this: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rHighLight").sprite)) ? 0 : 1)) {
  callNamed("releaseSprite", meProp(_me, "m_rHighLight").sprite.spriteNum)
  setThePropOf(meProp(_me, "m_rHighLight"), "sprite", undefined);
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rHighLight").member)) ? 0 : 1)) {
  callNamed("removeMember", meProp(_me, "m_rHighLight").member.name)
  setThePropOf(meProp(_me, "m_rHighLight"), "member", undefined);
  }

}

