// vmk_speedway_handler.cct / CAutopiaSpeedwayComponent / GateClosed

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GateClosed(_me: LingoMe, a_iAnimRef: LingoValue) {
  if (meProp(_me, "m_bReady")) {
  switch (a_iAnimRef) {
case 0:
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_4", symbol("show"))
  break;
case 1:
  callNamed("executeMessage", symbol("changeAnimationState"), "vmk_anim_3", symbol("show"))
  break;
  }

  }

}

