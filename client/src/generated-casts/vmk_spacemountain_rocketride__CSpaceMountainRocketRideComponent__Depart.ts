// vmk_spacemountain_rocketride.cct / CSpaceMountainRocketRideComponent / Depart

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Depart(_me: LingoMe, i_age: LingoValue) {
  if (meProp(_me, "m_bReady")) {
  callMethod("showEmptyMasks", _me)
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_2", symbol("show"))
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_2", symbol("goto"), "depart")
  }

}

