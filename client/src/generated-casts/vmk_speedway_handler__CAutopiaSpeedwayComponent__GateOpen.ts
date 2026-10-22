// vmk_speedway_handler.cct / CAutopiaSpeedwayComponent / GateOpen

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
  switch (a_iAnimRef) {
case 0:
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_4", symbol("hide"))
  break;
case 1:
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_3", symbol("hide"))
  break;
  }

  }

}

