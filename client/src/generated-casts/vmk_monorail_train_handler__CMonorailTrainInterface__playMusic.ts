// vmk_monorail_train_handler.cct / CMonorailTrainInterface / playMusic

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function playMusic(_me: LingoMe, _song: LingoValue) {
  var t_bOn = callMethod("get", callNamed("getObject", symbol("session")), "music");
  if (lingoBinary("and", t_bOn, meProp(_me, "m_bAllowMusic"))) {
  if (callNamed("objectp", meProp(_me, "m_pTrainMusic"))) {
  callMethod("StopSound", meProp(_me, "m_pTrainMusic"))
  callMethod("Define", meProp(_me, "m_pTrainMusic"), _song)
  callMethod("setLoopCount", meProp(_me, "m_pTrainMusic"), 10)
  callMethod("SetFadeIn", meProp(_me, "m_pTrainMusic"), 2)
  callMethod("PlaySound", meProp(_me, "m_pTrainMusic"))
  }

  }

}

