// 38365562899c7799eeaea4a99041ea57.cct / CQuestNotificationTaskFailed / rawData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function rawData(_me: LingoMe, t_ar_data: LingoValue) {
  callNamed("put", "Fill blanks (Task Failed)")
  var t_sTask = lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "Task", lingoBinary("add", t_ar_data[symbol("taskNumber")], 1)), "/"), t_ar_data[symbol("totalTaskCount")]);
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.dialog.hd", lingoBinary("join", lingoBinary("join", t_ar_data[symbol("questName")], ", "), t_sTask))
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.taskresults.hd", callNamed("getText", "quest.dialog.hd.taskfailed"))
  if (t_ar_data[symbol("timedOut")]) {
  var t_sTaskResults = callNamed("getText", "quest.task.failed");
  } else {
  t_sTaskResults = callNamed("getText", "quest.task.failed.alternative", callNamed("getText", "quest.task.failed"));
  }

  var t_sReplaceText = lingoBinary("join", lingoBinary("join", lingoBinary("add", t_ar_data[symbol("taskNumber")], 1), "/"), t_ar_data[symbol("totalTaskCount")]);
  t_sTaskResults = callNamed("replaceChunks", t_sTaskResults, "%tasknumber%", t_sReplaceText);
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.taskresults.text", t_sTaskResults)
  callNamed("createTimeout", callNamed("getUniqueID"), 100, symbol("updateTimer"), callMethod("getID", _me), new LingoPropList([symbol("elem"), "quest.timetotal", symbol("time"), t_ar_data[symbol("questDurationInSecs")], symbol("amount"), 1]), 1)
  setMeProp(_me, "m_ar_data", t_ar_data);
}

