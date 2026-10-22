// vmk_tomorrowland_hub_rocketride.cct / CTomorrowlandRocketRideComponent / animationFreezed

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function animationFreezed(_me: LingoMe, a_sAnimationID: LingoValue) {
  switch (a_sAnimationID) {
case "vmk_anim_8":
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_8", symbol("hide"))
  break;
  }

}

