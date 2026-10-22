// 38365562899c7799eeaea4a99041ea57.cct / CQuestNotificationQuestCancelled / rawData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function rawData(_me: LingoMe, t_ar_data: LingoValue) {
  callNamed("put", "Fill blanks (Quest Cancelled)")
  setMeProp(_me, "m_ar_data", t_ar_data);
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.dialog.hd", callNamed("getText", "quest.dialog.hd.questcancelled"))
  var t_iReason = t_ar_data[symbol("terminationReason")];
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.cancelled.info", callNamed("getText", lingoBinary("join", "quest.cancelled.info.", t_iReason), callNamed("getText", "quest.cancelled.info")))
}

