// vmk_shark_reef_handler.cct / CSharkReefComponent / hideAnimations

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
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_2", symbol("hide"))
}

