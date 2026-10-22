// 38365562899c7799eeaea4a99041ea57.cct / CQuestNotificationTaskMultipleChoice / rawData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function rawData(_me: LingoMe, t_ar_data: LingoValue) {
  callNamed("put", "Fill blanks (CurrentTaskData) Multiple Choice")
  setMeProp(_me, "m_ar_data", t_ar_data);
  setMeProp(_me, "m_iCurrentID", t_ar_data[symbol("photoId")]);
  if (lingoBinary("lt", t_ar_data[symbol("remainingTaskDurationInSecs")], 0)) {
  var t_Elem = callMethod("getElement", meProp(_me, "m_rWindow"), "quest.timelimit");
  if (lingoBinary("neq", t_Elem, 0)) {
  callMethod("setText", t_Elem, callNamed("getText", "quest.task.notimelimit"))
  }

  } else {
  callNamed("createTimeout", callNamed("getUniqueID"), 100, symbol("updateTimer"), callMethod("getID", _me), new LingoPropList([symbol("elem"), "quest.timelimit", symbol("time"), t_ar_data[symbol("remainingTaskDurationInSecs")], symbol("amount"), -float(1)]), 1)
  }

  var t_sTask = lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "Task", lingoBinary("add", t_ar_data[symbol("taskNumber")], 1)), "/"), t_ar_data[symbol("totalTaskCount")]);
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.dialog.hd", lingoBinary("join", lingoBinary("join", t_ar_data[symbol("questName")], ", "), t_sTask))
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.taskhint.text", t_ar_data[symbol("description")])
  callNamed("createTimeout", callNamed("getUniqueID"), 100, symbol("updateTimer"), callMethod("getID", _me), new LingoPropList([symbol("elem"), "quest.timetotal", symbol("time"), t_ar_data[symbol("questDurationInSecs")], symbol("amount"), 1]), 1)
  callMethod("createRadioButton", _me, callNamed("min", 5, t_ar_data[symbol("option_count")]))
  for (var i = 1; i <= callNamed("min", 5, t_ar_data[symbol("option_count")]); ++i) {
  callMethod("setField", _me, meProp(_me, "m_rWindow"), lingoBinary("join", "answer", i), t_ar_data[symbol("option_array")][i][symbol("optionText")])
  }

  callMethod("reDraw", _me)
}

