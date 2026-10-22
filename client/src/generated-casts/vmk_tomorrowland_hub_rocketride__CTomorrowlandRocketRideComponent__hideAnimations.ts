// vmk_tomorrowland_hub_rocketride.cct / CTomorrowlandRocketRideComponent / hideAnimations

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function hideAnimations(_me: LingoMe) {
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_1", symbol("hide"))
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_5", symbol("hide"))
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_6", symbol("hide"))
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_7", symbol("hide"))
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_8", symbol("hide"))
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_9", symbol("hide"))
}

