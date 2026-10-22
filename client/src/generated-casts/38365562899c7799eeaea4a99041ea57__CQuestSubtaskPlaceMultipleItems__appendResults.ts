// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskPlaceMultipleItems / appendResults

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function appendResults(_me: LingoMe) {
  var t_rManager = callMethod("getManager", _me);
  var t_ar_results = new LingoPropList([]);
  t_ar_results[symbol("questTemplateId")] = meProp(_me, "m_ar_data")[symbol("questTemplateId")];
  t_ar_results[symbol("itemsData")] = meProp(_me, "m_ar_items");
  t_ar_results[symbol("required")] = meProp(_me, "m_iCurrentScore");
  callNamed("put", lingoBinary("joinPad", "Append.results: Current score", meProp(_me, "m_iCurrentScore")))
  if (callNamed("objectp", t_rManager)) {
  callMethod("appendSubResult", t_rManager, t_ar_results)
  }

}

