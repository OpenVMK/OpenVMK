// 38365562899c7799eeaea4a99041ea57.cct / CQuestNotificationPrizeData / rawData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function rawData(_me: LingoMe, t_ar_data: LingoValue) {
  callNamed("put", lingoBinary("joinPad", "Prize Data", t_ar_data))
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.dialog.hd", callNamed("getText", "quest.prizedata.title"))
  setMeProp(_me, "m_ar_data", t_ar_data);
  for (var i = 1; i <= meProp(_me, "m_ar_data")[symbol("remaining_prize_array")].count; ++i) {
  var t_ar_prizeData = meProp(_me, "m_ar_data")[symbol("remaining_prize_array")][i];
  callMethod("updatePrizeRank", _me, t_ar_prizeData, i)
  }

}

