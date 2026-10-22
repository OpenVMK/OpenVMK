// 38365562899c7799eeaea4a99041ea57.cct / CQuestInfoStaffTimerace / updateTimer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateTimer(_me: LingoMe, t_ar_data: LingoValue) {
  var t_sElem = t_ar_data[symbol("elem")];
  var t_iTime = t_ar_data[symbol("time")];
  var t_iAmount = t_ar_data[symbol("amount")];
  var t_Elem = callMethod("getElement", meProp(_me, "m_rWindow"), t_sElem);
  if (lingoBinary("neq", t_Elem, 0)) {
  callMethod("setText", t_Elem, callNamed("seconds2time", t_iTime))
  }

  var t_iNewTime = lingoBinary("add", t_iTime, t_iAmount);
  if (lingoBinary("gte", t_iNewTime, 0)) {
  callNamed("createTimeout", callNamed("getUniqueID"), 1000, symbol("updateTimer"), callMethod("getID", _me), new LingoPropList([symbol("elem"), t_sElem, symbol("time"), t_iNewTime, symbol("amount"), t_iAmount]), 1)
  } else {
  var t_rManager = callMethod("getManager", _me);
  if (callNamed("objectp", t_rManager)) {
  callNamed("removeObject", callMethod("getID", t_rManager))
  }

  }

}

