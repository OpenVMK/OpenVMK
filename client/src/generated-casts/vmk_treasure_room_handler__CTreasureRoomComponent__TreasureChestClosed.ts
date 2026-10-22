// vmk_treasure_room_handler.cct / CTreasureRoomComponent / TreasureChestClosed

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TreasureChestClosed(_me: LingoMe, a_iAnimRef: LingoValue) {
  if (meProp(_me, "m_bReady")) {
  switch (a_iAnimRef) {
case 1:
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_5", symbol("goto"), "left_chest_idle")
  break;
case 2:
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_6", symbol("goto"), "mid_chest_idle")
  break;
case 0:
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_7", symbol("goto"), "right_chest_idle")
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "TODO close all treasure chests", a_iAnimRef))
  }

  }

}

