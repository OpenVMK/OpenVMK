// vmk_spacemountain_rocketride.cct / CSpaceMountainRocketRideComponent / rewindAndStopAnimations

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function rewindAndStopAnimations(_me: LingoMe) {
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_2", symbol("stop"))
}

