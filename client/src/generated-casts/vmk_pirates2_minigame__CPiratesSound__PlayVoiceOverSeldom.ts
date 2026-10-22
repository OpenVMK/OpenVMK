// vmk_pirates2_minigame.cct / CPiratesSound / PlayVoiceOverSeldom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlayVoiceOverSeldom(_me: LingoMe, a_sType: LingoValue) {
  if (lingoBinary("gte", meProp(_me, "m_iSeldomAcc"), callNamed("getVariableValue", "sound.voiceoverskip"))) {
  if (callMethod("get", callNamed("getObject", symbol("session")), "fx")) {
  if ((lingoTruthy(callMethod("isBusy", meProp(_me, "m_rMusic"))) ? 0 : 1)) {
  callMethod("setPlayList", meProp(_me, "m_rMusic"), new LingoPropList([]))
  callMethod("stop", meProp(_me, "m_rMusic"))
  var tRandom = callNamed("random", meProp(_me, "m_mp_rVOList")[a_sType].count);
  var t_rMem = meProp(_me, "m_mp_rVOList")[a_sType][tRandom];
  callMethod("setPlayList", meProp(_me, "m_rMusic"), new LingoList([new LingoPropList([symbol("member"), t_rMem])]))
  callMethod("play", meProp(_me, "m_rMusic"))
  }

  }

  setMeProp(_me, "m_iSeldomAcc", 1);
  } else {
  setMeProp(_me, "m_iSeldomAcc", lingoBinary("add", meProp(_me, "m_iSeldomAcc"), 1));
  }

}

