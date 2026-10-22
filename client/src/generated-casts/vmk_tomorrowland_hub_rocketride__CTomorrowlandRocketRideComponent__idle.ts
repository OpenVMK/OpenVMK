// vmk_tomorrowland_hub_rocketride.cct / CTomorrowlandRocketRideComponent / idle

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function idle(_me: LingoMe, i_age: LingoValue) {
  setMeProp(_me, "m_ar_hiddenAvatars", new LingoList([]));
  if (meProp(_me, "m_bReady")) {
  callMethod("rewindAndStopAnimations", _me)
  callMethod("showQueueTiles", _me)
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_1", symbol("show"))
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_1", symbol("play"))
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_1", symbol("freeze"))
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_6", symbol("show"))
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_6", symbol("play"))
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_6", symbol("freeze"))
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_7", symbol("show"))
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_7", symbol("play"))
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_7", symbol("freeze"))
  }

}

