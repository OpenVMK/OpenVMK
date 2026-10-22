// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep1 / showTaskInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showTaskInfo(_me: LingoMe, a_iActiveTaskID: LingoValue, a_bForceUpdate: LingoValue) {
  var t_rOwner = callMethod("GetOwner", callMethod("getManager", _me));
  var t_sTaskHint = "";
  var t_iTaskTime = -float(1);
  setMeProp(_me, "m_iCurrentPhotoID", -float(1));
  if (lingoBinary("gt", a_iActiveTaskID, 0)) {
  setMeProp(_me, "m_iActiveTaskID", a_iActiveTaskID);
  if (callNamed("objectp", t_rOwner)) {
  var t_ar_data = callMethod("getData", t_rOwner);
  var t_ar_tasks = t_ar_data[symbol("task_array")];
  if (callNamed("listp", t_ar_tasks)) {
  if (lingoBinary("gte", t_ar_tasks.count, meProp(_me, "m_iActiveTaskID"))) {
  var t_ar_taskData = t_ar_tasks[meProp(_me, "m_iActiveTaskID")];
  t_sTaskHint = t_ar_taskData[symbol("desc")];
  t_iTaskTime = t_ar_taskData[symbol("timeLimitInSecs")];
  setMeProp(_me, "m_iCurrentPhotoID", t_ar_taskData[symbol("photoId")]);
  }

  }

  }

  }

  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.taskhint.text", t_sTaskHint)
  if (lingoBinary("gt", t_iTaskTime, 0)) {
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.notimelimit.info", callNamed("seconds2time", t_iTaskTime))
  } else {
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.notimelimit.info", callNamed("getText", "quest.notimelimit.info"))
  }

  callMethod("reDraw", _me)
  callNamed("updateStage")
}

