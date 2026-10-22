// vmk_treasure_room_handler.cct / CTreasureRoomComponent / TreasureChestOpenEmpty

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TreasureChestOpenEmpty(_me: LingoMe, a_iAnimRef: LingoValue) {
  callNamed("executeMessage", "PlayFxSound", "VMK-treasurechest-1")
  if (meProp(_me, "m_bReady")) {
  switch (a_iAnimRef) {
case 1:
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_5", symbol("goto"), "left_chest_empty")
  break;
case 2:
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_6", symbol("goto"), "mid_chest_empty")
  break;
case 0:
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_7", symbol("goto"), "right_chest_empty")
  break;
  default:
  callNamed("error", _me, "Unknown animation ref", symbol("TreasureChestOpenEmpty"))
  }

  }

}

