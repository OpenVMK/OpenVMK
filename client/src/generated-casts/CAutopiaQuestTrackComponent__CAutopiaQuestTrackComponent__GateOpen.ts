// CAutopiaQuestTrackComponent.cct / CAutopiaQuestTrackComponent / GateOpen

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GateOpen(_me: LingoMe, a_iAnimRef: LingoValue) {
  if (meProp(_me, "m_bReady")) {
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_1", symbol("show"))
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_2", symbol("show"))
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_3", symbol("hide"))
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_4", symbol("hide"))
  }

}

