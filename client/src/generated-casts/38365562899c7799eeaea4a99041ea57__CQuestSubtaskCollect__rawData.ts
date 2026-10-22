// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskCollect / rawData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function rawData(_me: LingoMe, t_ar_data: LingoValue) {
  callNamed("put", lingoBinary("joinPad", "Update Collect Collectable", t_ar_data))
  setMeProp(_me, "m_ar_data", t_ar_data);
  var a_sElemID = "quest.collect1";
  switch (t_ar_data[symbol("itemCode")]) {
case 394:
  a_sElemID = "quest.collect1";
  break;
case 388:
  a_sElemID = "quest.collect2";
  break;
case 382:
  a_sElemID = "quest.collect3";
  break;
  }

  callMethod("clickElement", meProp(_me, "m_rRadioButton"), a_sElemID)
  callMethod("updateMenu", meProp(_me, "m_rRadioButton"))
  callMethod("setAmount", _me, t_ar_data[symbol("amount")])
  var t_rManager = callMethod("getManager", _me);
  if (callNamed("objectp", t_rManager)) {
  var t_ar_results = new LingoPropList([]);
  t_ar_results[symbol("taskType")] = t_ar_data[symbol("taskType")];
  callMethod("appendSubResult", t_rManager, t_ar_results)
  }

}

