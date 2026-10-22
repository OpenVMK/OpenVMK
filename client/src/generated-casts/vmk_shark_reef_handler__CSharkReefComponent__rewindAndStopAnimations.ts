// vmk_shark_reef_handler.cct / CSharkReefComponent / rewindAndStopAnimations

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function rewindAndStopAnimations(_me: LingoMe) {
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_1", symbol("stop"))
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_2", symbol("stop"))
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_1", symbol("rewind"))
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_2", symbol("rewind"))
}

