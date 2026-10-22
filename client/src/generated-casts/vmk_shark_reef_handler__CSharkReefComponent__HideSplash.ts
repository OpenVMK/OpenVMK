// vmk_shark_reef_handler.cct / CSharkReefComponent / HideSplash

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HideSplash(_me: LingoMe, a_iAnimRef: LingoValue) {
  if (meProp(_me, "m_bReady")) {
  switch (a_iAnimRef) {
case "vmk_anim_1":
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_1", symbol("hide"))
  break;
case "vmk_anim_2":
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_2", symbol("hide"))
  break;
  default:
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_1", symbol("hide"))
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_2", symbol("hide"))
  }

  }

}

