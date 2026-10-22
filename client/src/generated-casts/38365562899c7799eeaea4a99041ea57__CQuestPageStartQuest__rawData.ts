// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStartQuest / rawData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function rawData(_me: LingoMe, t_ar_data: LingoValue) {
  setMeProp(_me, "m_ar_data", t_ar_data);
  callNamed("put", lingoBinary("joinPad", "Fill blanks (Start Quest)", t_ar_data))
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.main.hd", t_ar_data[symbol("questName")])
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.info", t_ar_data[symbol("description")])
  for (var i = 1; i <= t_ar_data[symbol("prize_array")].count; ++i) {
  var t_ar_prizeData = t_ar_data[symbol("prize_array")][i];
  callMethod("updatePrizeRank", _me, t_ar_prizeData, i)
  }

  for (var t_ar_task of t_ar_data[symbol("task_array")].toArray()) {
  callMethod("add_task", _me, t_ar_task)
  }

  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "quest.tasklist"), callMethod("render", meProp(_me, "m_ar_components")["quest.tasklist"]))
  switch (t_ar_data[symbol("status")]) {
case 3:
  callMethod("setButtonState", _me, meProp(_me, "m_rWindow"), "quest.continuelater.button", 0)
  callMethod("setButtonState", _me, meProp(_me, "m_rWindow"), "quest.test.button", 0)
  break;
  default:
  callMethod("setButtonState", _me, meProp(_me, "m_rWindow"), "quest.release.button", 0)
  callMethod("setButtonState", _me, meProp(_me, "m_rWindow"), "quest.releaselater.button", 0)
  }

  switch (t_ar_data[symbol("prizingMode")]) {
case 0:
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.type.text", callNamed("getText", lingoBinary("join", "quest.type.", t_ar_data[symbol("prizingMode")])))
  break;
case 1:
  var t_iTimeInMins = lingoBinary("div", t_ar_data[symbol("questDurationInSecs")], 60);
  var t_sText = callNamed("replaceChunks", callNamed("getText", "quest.type.1"), "%time%", t_iTimeInMins);
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.type.text", t_sText)
  break;
  default:
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.type.text", callNamed("getText", "quest.type.0"))
  }

  var t_iTotalItemCount = 0;
  var t_iTotalCreditsCount = 0;
  for (var i = 1; i <= t_ar_data[symbol("prize_array")].count; ++i) {
  t_ar_prizeData = t_ar_data[symbol("prize_array")][i];
  t_iTotalItemCount = lingoBinary("add", t_iTotalItemCount, t_ar_prizeData[symbol("item_array")].count);
  t_iTotalCreditsCount = lingoBinary("add", t_iTotalCreditsCount, t_ar_prizeData[symbol("credits")]);
  }

  t_sText = callNamed("replaceChunks", callNamed("getText", "quest.prizeoffer.info"), "%credits%", t_iTotalCreditsCount);
  t_sText = callNamed("replaceChunks", t_sText, "%items%", t_iTotalItemCount);
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.prizeoffer.info", t_sText)
}

