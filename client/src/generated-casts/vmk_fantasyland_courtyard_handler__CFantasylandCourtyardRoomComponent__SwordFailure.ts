// vmk_fantasyland_courtyard_handler.cct / CFantasylandCourtyardRoomComponent / SwordFailure

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SwordFailure(_me: LingoMe, a_iAnimRef: LingoValue) {
  if (meProp(_me, "m_bReady")) {
  callNamed("executeMessage", symbol("changeAnimationState"), meProp(_me, "m_sAnimName"), symbol("goto"), "failure")
  }

}

