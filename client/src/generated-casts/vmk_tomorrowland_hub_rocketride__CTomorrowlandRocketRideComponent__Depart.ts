// vmk_tomorrowland_hub_rocketride.cct / CTomorrowlandRocketRideComponent / Depart

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Depart(_me: LingoMe, i_age: LingoValue) {
  setMeProp(_me, "m_ar_hiddenAvatars", new LingoList([]));
  if (meProp(_me, "m_bReady")) {
  setMeProp(_me, "m_ar_hiddenAvatars", callMethod("hideSittingAvatars", _me));
  callMethod("rewindAndStopAnimations", _me)
  callMethod("hideAnimations", _me)
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_8", symbol("rewind"))
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_8", symbol("show"))
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_8", symbol("play"))
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_8", symbol("freeze"))
  }

}

