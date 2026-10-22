// 38365562899c7799eeaea4a99041ea57.cct / CQuestNotificationQuestCompleted / rawData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function rawData(_me: LingoMe, t_ar_data: LingoValue) {
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.dialog.hd", t_ar_data[symbol("questName")])
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.taskresults.hd", callNamed("getText", "quest.questresults.congratulations"))
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.timetotal", callNamed("seconds2time", t_ar_data[symbol("questDurationInSecs")]))
  var t_sPrizeResults = "";
  if (lingoBinary("eq", t_ar_data[symbol("prizingMode")], 1)) {
  var t_sTaskResults = lingoBinary("join", callNamed("replaceChunks", callNamed("getText", "quest.questprize.timedquest"), "%timeleft%", callNamed("seconds2time", t_ar_data[symbol("remainingQuestDurationInSecs")])), " ");
  } else {
  if (lingoBinary("and", lingoBinary("eq", t_ar_data[symbol("item_array")].count, 0), lingoBinary("eq", t_ar_data[symbol("credits")], 0))) {
  t_sTaskResults = callNamed("getText", "quest.questprize.noprize");
  } else {
  t_sTaskResults = lingoBinary("join", callNamed("replaceChunks", callNamed("getText", "quest.questprize"), "%prize%", callNamed("rank2text", t_ar_data[symbol("rank")])), " ");
  for (var i = 1; i <= t_ar_data[symbol("item_array")].count; ++i) {
  var t_sItem = lingoBinary("join", "item.", t_ar_data[symbol("item_array")][i][symbol("itemCode")]);
  var t_sProduct = lingoBinary("join", "product.", t_ar_data[symbol("item_array")][i][symbol("itemCode")]);
  var t_sName = callNamed("getText", t_sItem, callNamed("getText", t_sProduct));
  t_sPrizeResults = lingoBinary("join", t_sPrizeResults, t_sName);
  if (lingoBinary("eq", i, t_ar_data[symbol("item_array")].count)) {
  t_sPrizeResults = lingoBinary("join", t_sPrizeResults, " and ");
  continue;
  }

  t_sPrizeResults = lingoBinary("join", t_sPrizeResults, ", ");
  }

  t_sPrizeResults = lingoBinary("joinPad", lingoBinary("join", t_sPrizeResults, t_ar_data[symbol("credits")]), "credits");
  }

  }

  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.questresults.text", lingoBinary("join", lingoBinary("join", t_sTaskResults, "\r"), t_sPrizeResults))
  setMeProp(_me, "m_ar_data", t_ar_data);
}

