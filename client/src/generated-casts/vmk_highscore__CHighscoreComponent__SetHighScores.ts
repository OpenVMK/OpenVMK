// vmk_highscore.cct / CHighscoreComponent / SetHighScores

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetHighScores(_me: LingoMe, a_mp_highscoretable: LingoValue, a_bForceRender: LingoValue) {
  if (lingoBinary("and", callNamed("objectp", meProp(_me, "m_rElement")), (lingoTruthy(callNamed("voidp", meProp(_me, "m_rItemList"))) ? 0 : 1))) {
  if (a_bForceRender) {
  if (callNamed("listp", a_mp_highscoretable)) {
  callMethod("feedImage", meProp(_me, "m_rElement"), callMethod("createTopics", meProp(_me, "m_rItemList"), a_mp_highscoretable))
  }

  } else {
  if (lingoBinary("gt", a_mp_highscoretable.count, 0)) {
  callMethod("feedImage", meProp(_me, "m_rElement"), callMethod("createTopics", meProp(_me, "m_rItemList"), a_mp_highscoretable))
  }

  }

  }

  callNamed("executeMessage", symbol("SetHighScores"), meProp(_me, "m_rElement"))
}

