// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskAddTask / proceedWithSelectedTask

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function proceedWithSelectedTask(_me: LingoMe) {
  var t_rComponent = meProp(_me, "m_ar_components")["quest.newtasks"];
  var t_rActiveTask = callMethod("GetActive", t_rComponent);
  if (callNamed("objectp", t_rActiveTask)) {
  var t_ar_subtasks = new LingoList([]);
  var t_bDefinitionOK = 1;
  switch (callMethod("getEvent", t_rActiveTask)) {
case "addtask.1":
  t_ar_subtasks = new LingoList(["visitnpc", "writehint"]);
  break;
case "addtask.2":
  t_ar_subtasks = new LingoList([]);
  break;
case "addtask.3":
  t_ar_subtasks = new LingoList(["roomvisit", "writehint"]);
  break;
case "addtask.4":
  t_ar_subtasks = new LingoList(["minigame", "writehint"]);
  break;
case "addtask.5":
  t_ar_subtasks = new LingoList(["magics", "writehint"]);
  break;
case "addtask.6":
  t_ar_subtasks = new LingoList(["writehint"]);
  break;
case "addtask.7":
  t_ar_subtasks = new LingoList(["sayword", "writehint"]);
  break;
case "addtask.8":
  t_ar_subtasks = new LingoList(["spendcredits", "writehint"]);
  break;
case "addtask.9":
  t_ar_subtasks = new LingoList(["earncredits", "writehint"]);
  break;
case "addtask.10":
  t_ar_subtasks = new LingoList(["writehint"]);
  break;
case "addtask.11":
  t_ar_subtasks = new LingoList(["writehint"]);
  break;
case "addtask.12":
  t_ar_subtasks = new LingoList(["emote", "writehint"]);
  break;
case "addtask.13":
  t_ar_subtasks = new LingoList(["writehint"]);
  break;
case "addtask.14":
  t_ar_subtasks = new LingoList(["writehint"]);
  break;
case "addtask.15":
  t_ar_subtasks = new LingoList(["acquireitem", "writehint"]);
  break;
case "addtask.16":
  t_ar_subtasks = new LingoList(["writehint"]);
  break;
case "addtask.17":
  t_ar_subtasks = new LingoList(["writequestion", "multichoicetask"]);
  break;
case "addtask.18":
  t_ar_subtasks = new LingoList(["collect", "writehint"]);
  break;
case "addtask.19":
  t_ar_subtasks = new LingoList([]);
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "[subtask.addtask.event]", callMethod("getEvent", t_rActiveTask)))
  t_ar_subtasks = new LingoList([]);
  t_bDefinitionOK = 0;
  }

  if ((lingoTruthy(t_bDefinitionOK) ? 0 : 1)) {
  var t_txt = callNamed("getText", "quest.alert.definition.missing");
  var t_title = callNamed("getText", "quest.alert.title");
  var t_btn1 = callNamed("getText", "quest.alert.ok");
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "quest.alert.definition", 1, 1);
  callMethod("setText", t, t_txt, t_title, t_btn1)
  callMethod("show", t)
  } else {
  var t_rManager = callMethod("getManager", _me);
  if (callNamed("objectp", t_rManager)) {
  callMethod("resolveSubtask", t_rManager)
  callMethod("flushSubtasks", t_rManager)
  callMethod("populate", t_rManager, t_ar_subtasks)
  callMethod("appendSubResult", t_rManager, new LingoPropList([symbol("task"), callMethod("getEvent", t_rActiveTask)]))
  callMethod("Activate", t_rManager)
  }

  }

  } else {
  t_txt = callNamed("getText", "quest.alert.select.task");
  t_title = callNamed("getText", "quest.alert.title");
  t_btn1 = callNamed("getText", "quest.alert.ok");
  t = callNamed("createDialogWindow", callMethod("getID", _me), "quest.alert.select.task", 1, 1);
  callMethod("setText", t, t_txt, t_title, t_btn1)
  callMethod("show", t)
  }

}

