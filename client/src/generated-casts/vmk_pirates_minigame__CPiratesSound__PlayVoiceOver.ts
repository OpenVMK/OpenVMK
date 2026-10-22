// vmk_pirates_minigame.cct / CPiratesSound / PlayVoiceOver

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlayVoiceOver(_me: LingoMe, a_sType: LingoValue) {
  if (callMethod("get", callNamed("getObject", symbol("session")), "fx")) {
  if ((lingoTruthy(callMethod("isBusy", meProp(_me, "m_rMusic"))) ? 0 : 1)) {
  callMethod("stop", meProp(_me, "m_rMusic"))
  var tRandom = callNamed("random", meProp(_me, "m_mp_rVOList")[a_sType].count);
  callMethod("queue", meProp(_me, "m_rMusic"), new LingoPropList([symbol("member"), meProp(_me, "m_mp_rVOList")[a_sType][tRandom]]))
  callMethod("play", meProp(_me, "m_rMusic"))
  }

  }

}

