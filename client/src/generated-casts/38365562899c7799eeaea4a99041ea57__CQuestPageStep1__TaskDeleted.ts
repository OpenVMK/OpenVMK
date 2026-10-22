// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep1 / TaskDeleted

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TaskDeleted(_me: LingoMe, t_ar_data: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rComponentsPage"))) {
  var t_rClientElement = callMethod("getElement", meProp(_me, "m_rWindow"), "quest.tasklist");
  callMethod("deleteComponentAt", meProp(_me, "m_rComponentsPage"), lingoBinary("add", t_ar_data[symbol("taskNumber")], 1))
  var t_rImg = callMethod("render", meProp(_me, "m_rComponentsPage"));
  callMethod("feedImage", t_rClientElement, t_rImg)
  }

  callMethod("showTaskInfo", _me, -float(1))
}

