// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskAddTaskTime / _EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProc(_me: LingoMe, a_kEvent: LingoValue, a_sElemID: LingoValue, a_vParam: LingoValue) {
  var tWndObj = meProp(_me, "m_rWindow");
  var t_rManager = callMethod("getManager", _me);
  if (lingoBinary("eq", a_kEvent, symbol("mouseUp"))) {
  switch (a_sElemID) {
case "quest.notimelimit":
case "quest.tasktime1":
case "quest.tasktime2":
case "quest.tasktime3":
case "quest.tasktime4":
case "quest.tasktime5":
case "quest.tasktime6":
case "quest.tasktime7":
case "quest.tasktime8":
  callMethod("clickElement", meProp(_me, "m_rRadioButton"), a_sElemID)
  callMethod("updateMenu", meProp(_me, "m_rRadioButton"))
  break;
case "quest.notimelimit.hd":
case "quest.tasktime1.hd":
case "quest.tasktime2.hd":
case "quest.tasktime3.hd":
case "quest.tasktime4.hd":
case "quest.tasktime5.hd":
case "quest.tasktime6.hd":
case "quest.tasktime7.hd":
case "quest.tasktime8.hd":
  callMethod("clickElement", meProp(_me, "m_rRadioButton"), callNamed("replaceChunks", a_sElemID, ".hd", ""))
  callMethod("updateMenu", meProp(_me, "m_rRadioButton"))
  break;
case "mes.accept.button":
  if (callNamed("objectp", t_rManager)) {
  var t_ar_results = new LingoPropList([]);
  t_ar_results[symbol("timeLimitInSecs")] = callMethod("getValue", meProp(_me, "m_rRadioButton"));
  callMethod("appendSubResult", t_rManager, t_ar_results)
  callMethod("resolveSubtask", t_rManager)
  callMethod("Activate", t_rManager)
  }

  break;
case "close":
case "quest.quit":
case "mes.deny.button":
  t_rManager = callMethod("getManager", _me);
  if (callNamed("objectp", t_rManager)) {
  callMethod("cancelSubtask", t_rManager)
  callMethod("Activate", t_rManager)
  }

  break;
case "help":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callNamed("executeMessage", symbol("open_help_page"), callNamed("getText", "help.quest.addtask", callNamed("getText", "help.quest", "help.quest")), 1)
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Subtask.AddTaskTime.event:", a_sElemID))
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  }

  }

}

