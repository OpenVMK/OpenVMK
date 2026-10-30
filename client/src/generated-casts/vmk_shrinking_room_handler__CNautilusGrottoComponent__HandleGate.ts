// vmk_shrinking_room_handler.cct (Disney's file, archived as vmk_grotto_handler.cct) / CNautilusGrottoComponent / HandleGate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HandleGate(_me: LingoMe, a_iState: LingoValue) {
  if (meProp(_me, "m_bReady")) {
  switch (a_iState) {
case 0:
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_9", symbol("show"))
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_10", symbol("show"))
  break;
case 1:
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_9", symbol("hide"))
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_10", symbol("hide"))
  break;
  }

  }

}

