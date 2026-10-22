// 38365562899c7799eeaea4a99041ea57.cct / CQuestTemplateDataContainer / updateCredits

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateCredits(_me: LingoMe) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "OK, so update the prizes then??", meProp(_me, "m_sCurrentPage")), callMethod("get", callNamed("getObject", symbol("session")), "user_credits")))
  if (lingoBinary("eq", meProp(_me, "m_sCurrentPage"), "step2")) {
  var t_rCurrentPage = callMethod("getPage", callMethod("GetBase", callMethod("getInterface", meProp(_me, "m_rInterface"))));
  callMethod("setCredits", t_rCurrentPage, callMethod("get", callNamed("getObject", symbol("session")), "user_credits"))
  }

}

