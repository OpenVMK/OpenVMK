// vmk_shark_reef_handler.cct / CSharkReefComponent / ShowSplash

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowSplash(_me: LingoMe, a_iAnimRef: LingoValue) {
  if (meProp(_me, "m_bReady")) {
  switch (a_iAnimRef) {
case 0:
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_1", symbol("rewind"))
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_1", symbol("show"))
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_1", symbol("freeze"))
  callNamed("executeMessage", "PlayFxSound", "SR-fallintowater")
  break;
case 1:
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_2", symbol("rewind"))
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_2", symbol("show"))
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_2", symbol("freeze"))
  callNamed("executeMessage", "PlayFxSound", "SR-fallintowater")
  break;
  }

  }

}

