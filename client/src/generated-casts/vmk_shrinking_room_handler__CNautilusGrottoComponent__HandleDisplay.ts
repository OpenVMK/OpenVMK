// vmk_shrinking_room_handler.cct (Disney's file, archived as vmk_grotto_handler.cct) / CNautilusGrottoComponent / HandleDisplay

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HandleDisplay(_me: LingoMe, a_iState: LingoValue) {
  switch (a_iState) {
case 0:
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_1", symbol("show"))
  break;
case 1:
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_1", symbol("hide"))
  break;
  }

}

