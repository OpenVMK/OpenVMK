// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskCollect / saveData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function saveData(_me: LingoMe) {
  var t_rManager = callMethod("getManager", _me);
  var t_rOwner = callMethod("GetOwner", t_rManager);
  var t_iChosenAnswer = callMethod("getValue", meProp(_me, "m_rRadioButton"));
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "Collectable choices", t_iChosenAnswer), meProp(_me, "m_iCurrentScore")))
  if (lingoBinary("eq", meProp(_me, "m_iCurrentScore"), 0)) {
  return 0;
  }

  if (callNamed("objectp", t_rManager)) {
  var t_ar_results = new LingoPropList([]);
  t_ar_results[symbol("itemCode")] = t_iChosenAnswer;
  t_ar_results[symbol("amount")] = meProp(_me, "m_iCurrentScore");
  callMethod("appendSubResult", t_rManager, t_ar_results)
  return 1;
  }

  return 0;
}

