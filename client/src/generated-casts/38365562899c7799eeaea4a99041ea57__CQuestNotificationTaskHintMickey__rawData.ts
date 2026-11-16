// 38365562899c7799eeaea4a99041ea57.cct / CQuestNotificationTaskHintMickey / rawData

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
  setMeProp(_me, "m_iCurrentID", t_ar_data[symbol("photoId")]);
  var t_sTask = lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "Task", lingoBinary("add", t_ar_data[symbol("taskNumber")], 1)), "/"), t_ar_data[symbol("totalTaskCount")]);
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.dialog.hd", lingoBinary("join", lingoBinary("join", t_ar_data[symbol("questName")], ", "), t_sTask))
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.taskhint.text", t_ar_data[symbol("description")])
  if (lingoBinary("lt", t_ar_data[symbol("remainingTaskDurationInSecs")], 0)) {
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.timelimit", callNamed("getText", "quest.task.notimelimit"))
  } else {
  callNamed("createTimeout", callNamed("getUniqueID"), 100, symbol("updateTimer"), callMethod("getID", _me), new LingoPropList([symbol("elem"), "quest.timelimit", symbol("time"), t_ar_data[symbol("remainingTaskDurationInSecs")], symbol("amount"), -float(1)]), 1)
  }

  callNamed("createTimeout", callNamed("getUniqueID"), 100, symbol("updateTimer"), callMethod("getID", _me), new LingoPropList([symbol("elem"), "quest.timetotal", symbol("time"), t_ar_data[symbol("questDurationInSecs")], symbol("amount"), 1]), 1)
  var t_sMickeyInfo = "";
  if (lingoBinary("gt", t_ar_data[symbol("foundMickeyColor_count")], 0)) {
  for (var i = 1; i <= callNamed("min", 5, t_ar_data[symbol("foundMickeyColor_count")]); ++i) {
  var t_iColor = t_ar_data[symbol("foundMickeyColor_array")][i][symbol("mickeyColor")];
  var t_iCount = t_ar_data[symbol("foundMickeyColor_array")][i][symbol("mickeyCount")];
  var t_sColor = callNamed("getText", lingoBinary("join", "hidden.mickey.color.", t_iColor));
  t_sMickeyInfo = lingoBinary("join", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("join", t_sMickeyInfo, t_iCount), t_sColor), callNamed("getText", "hidden.mickeys.photographed", "Hidden Mickey photographed.")), "\r");
  }

  } else {
  callNamed("put", "0 Mickeys found")
  }

  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.foundmickeys.info", t_sMickeyInfo)
  callMethod("reDraw", _me)
}

