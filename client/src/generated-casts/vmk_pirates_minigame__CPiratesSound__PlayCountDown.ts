// vmk_pirates_minigame.cct / CPiratesSound / PlayCountDown

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlayCountDown(_me: LingoMe, a_offset: LingoValue) {
  if (callMethod("get", callNamed("getObject", symbol("session")), "fx")) {
  callMethod("stop", meProp(_me, "m_rCountDown"))
  callMethod("queue", meProp(_me, "m_rCountDown"), new LingoPropList([symbol("member"), callNamed("getMember", meProp(_me, "m_mp_sSoundList")["Countdown"][a_offset])]))
  callMethod("play", meProp(_me, "m_rCountDown"))
  }

}

