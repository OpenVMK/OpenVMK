// 38365562899c7799eeaea4a99041ea57.cct / CQuestNotificationTaskCompleted / rawData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function rawData(_me: LingoMe, t_ar_data: LingoValue) {
  callNamed("put", "Fill blanks (Task Completed)")
  var t_sTask = lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "Task", lingoBinary("add", t_ar_data[symbol("taskNumber")], 1)), "/"), t_ar_data[symbol("totalTaskCount")]);
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.dialog.hd", lingoBinary("join", lingoBinary("join", t_ar_data[symbol("questName")], ", "), t_sTask))
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.taskresults.hd", callNamed("getText", "quest.dialog.hd.taskcompleted"))
  callNamed("createTimeout", callNamed("getUniqueID"), 100, symbol("updateTimer"), callMethod("getID", _me), new LingoPropList([symbol("elem"), "quest.timetotal", symbol("time"), t_ar_data[symbol("questDurationInSecs")], symbol("amount"), 1]), 1)
  var t_iTaskType = t_ar_data[symbol("taskType")];
  var t_sTaskResults = callNamed("getText", lingoBinary("join", "quest.task.completed.", t_iTaskType), callNamed("getText", "quest.task.completed"));
  var t_sReplaceText = lingoBinary("join", lingoBinary("join", lingoBinary("add", t_ar_data[symbol("taskNumber")], 1), "/"), t_ar_data[symbol("totalTaskCount")]);
  t_sTaskResults = callNamed("replaceChunks", t_sTaskResults, "%tasknumber%", t_sReplaceText);
  if (t_ar_data[symbol("solvedImmediately")]) {
  t_sTaskResults = lingoBinary("join", lingoBinary("join", t_sTaskResults, "\r"), callNamed("getText", "quest.task.completed.immediately"));
  }

  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.taskresults.text", t_sTaskResults)
  setMeProp(_me, "m_ar_data", t_ar_data);
}

