// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep1 / _EventProc

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
  if (callNamed("objectp", t_rManager)) {
  var t_rOwner = callMethod("GetOwner", t_rManager);
  }

  if (lingoBinary("eq", a_kEvent, symbol("mouseUp"))) {
  switch (a_sElemID) {
case "quest.tasklist":
  var t_ar_event = new LingoPropList([symbol("found"), 0, symbol("event"), "", symbol("client"), undefined, symbol("route"), new LingoPropList([])]);
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callMethod("EventProc", meProp(_me, "m_rComponentsPage"), a_vParam, t_ar_event)
  if (t_ar_event.found) {
  var t_ar_questData = callMethod("getData", callMethod("GetOwner", callMethod("getManager", _me)));
  var t_rClientElement = callMethod("getElement", tWndObj, a_sElemID);
  switch (t_ar_event.event) {
case "quest.renametask":
  var t_iActiveTaskID = callMethod("getComponentID", meProp(_me, "m_rComponentsPage"), t_ar_event.route.component);
  if ((lingoTruthy(callNamed("voidp", t_iActiveTaskID)) ? 0 : 1)) {
  if (lingoBinary("lt", t_iActiveTaskID, callMethod("GetComponents", meProp(_me, "m_rComponentsPage")).count)) {
  callMethod("showTaskInfo", _me, t_iActiveTaskID, 1)
  if (theProperty("doubleClick")) {
  callMethod("startEditingTask", _me, t_iActiveTaskID)
  }

  }

  }

  break;
case "quest.delete":
  var t_ID = lingoBinary("sub", callMethod("getComponentID", meProp(_me, "m_rComponentsPage"), t_ar_event.route.component), 1);
  callMethod("DeleteTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), new LingoList([t_ar_questData[symbol("questTemplateId")], t_ID]))
  break;
case "quest.newtask":
  if (lingoBinary("neq", callNamed("getObject", "QuestDialogManagerAddTask"), 0)) {
  callNamed("removeObject", "QuestDialogManagerAddTask")
  }

  var t = callNamed("createObject", "QuestDialogManagerAddTask", "CQuestWindowManager");
  callMethod("SetType", callMethod("getInterface", t), "maker")
  callMethod("SetOwner", t, _me)
  callMethod("populate", t, new LingoList(["addtask"]))
  callMethod("Activate", t)
  break;
case "quest.taskhint":
  setMeProp(_me, "m_iActiveTaskID", callMethod("getComponentID", meProp(_me, "m_rComponentsPage"), t_ar_event.route.component));
  var t_ar_task = callMethod("getData", t_rOwner)[symbol("task_array")][meProp(_me, "m_iActiveTaskID")];
  callNamed("CreateQuestNotification", "QuestNotificationStep1TaskHint", _me, new LingoList(["writehint"]), "maker", t_ar_task)
  break;
case "quest.timelimit":
  setMeProp(_me, "m_iActiveTaskID", callMethod("getComponentID", meProp(_me, "m_rComponentsPage"), t_ar_event.route.component));
  t_ar_task = callMethod("getData", t_rOwner)[symbol("task_array")][meProp(_me, "m_iActiveTaskID")];
  callNamed("CreateQuestNotification", "QuestNotificationStep1TaskTimeLimit", _me, new LingoList(["addtasktime"]), "maker", t_ar_task)
  break;
case "quest.moveup":
  t_ID = lingoBinary("sub", callMethod("getComponentID", meProp(_me, "m_rComponentsPage"), t_ar_event.route.component), 1);
  callMethod("MoveTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), new LingoList([t_ar_questData[symbol("questTemplateId")], t_ID, 1]))
  break;
case "quest.movedown":
  t_ID = lingoBinary("sub", callMethod("getComponentID", meProp(_me, "m_rComponentsPage"), t_ar_event.route.component), 1);
  callMethod("MoveTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), new LingoList([t_ar_questData[symbol("questTemplateId")], t_ID, 0]))
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "[Questengine.event]", t_ar_event.event))
  }

  t_rClientElement = callMethod("getElement", meProp(_me, "m_rWindow"), a_sElemID);
  var t_rImg = callMethod("render", meProp(_me, "m_rComponentsPage"));
  callMethod("feedImage", t_rClientElement, t_rImg)
  }

  break;
case "quest.addtimelimit":
  if (lingoBinary("gt", meProp(_me, "m_iActiveTaskID"), 0)) {
  t_ar_task = callMethod("getData", t_rOwner)[symbol("task_array")][meProp(_me, "m_iActiveTaskID")];
  callNamed("CreateQuestNotification", "QuestNotificationStep1TaskTimeLimit", _me, new LingoList(["addtasktime"]), "maker", t_ar_task)
  } else {
  callNamed("put", "Select task first")
  }

  break;
case "quest.edithint":
  if (lingoBinary("gt", meProp(_me, "m_iActiveTaskID"), 0)) {
  t_ar_task = callMethod("getData", t_rOwner)[symbol("task_array")][meProp(_me, "m_iActiveTaskID")];
  callNamed("CreateQuestNotification", "QuestNotificationStep1TaskHint", _me, new LingoList(["writehint"]), "maker", t_ar_task)
  } else {
  callNamed("put", "Select task first")
  }

  break;
case "quest.cleartasks.button":
  var t_txt = callNamed("getText", "quest.confirmation.cleartasks");
  var t_title = callNamed("getText", "quest.alert.title");
  var t_btn1 = callNamed("getText", "quest.alert.cancel");
  var t_btn2 = callNamed("getText", "quest.alert.ok");
  t = callNamed("createDialogWindow", callMethod("getID", _me), "quest.confirmation.cleartasks", 2, 1);
  callMethod("setText", t, t_txt, t_title, t_btn1, t_btn2)
  callMethod("show", t)
  break;
case "quest.nextstep.button":
case "quest.tab.prizes.passive":
case "quest.tab.settings.passive":
  callMethod("saveCurrentDataToOwner", _me)
  if (callNamed("objectp", t_rManager)) {
  callMethod("resolveSubtask", t_rManager)
  if (lingoBinary("eq", a_sElemID, "quest.tab.settings.passive")) {
  callMethod("resolveSubtask", t_rManager)
  }

  callMethod("Activate", t_rManager)
  }

  break;
case "close":
  callNamed("removeObject", callMethod("getID", t_rOwner))
  break;
case "quest.continuelater.button":
  callMethod("saveCurrentDataToOwner", _me)
  if (callNamed("objectp", t_rOwner)) {
  var t_ar_results = new LingoPropList([]);
  t_ar_results[symbol("testQuest")] = 0;
  t_ar_results[symbol("releaseQuest")] = 0;
  var t_iTargetHandler = symbol("QuestDialogBroadcastEvent");
  if (lingoBinary("gt", callMethod("getOne", callMethod("handlers", t_rOwner), t_iTargetHandler), 0)) {
  callNamed("call", t_iTargetHandler, t_rOwner, callMethod("getID", _me), t_ar_results)
  }

  callNamed("removeObject", callMethod("getID", t_rOwner))
  }

  break;
case "quest.start.button":
  var t_bTestingRequired = 1;
  if (callNamed("objectp", t_rOwner)) {
  t_bTestingRequired = callMethod("GetTestingRequired", t_rOwner);
  }

  if (t_bTestingRequired) {
  t_txt = callNamed("getText", "quest.dialog.testconfirmation");
  } else {
  t_txt = callNamed("getText", "quest.dialog.test.notrequired");
  }

  t_title = callNamed("getText", "quest.alert.title");
  t_btn1 = callNamed("getText", "quest.alert.cancel");
  t_btn2 = callNamed("getText", "quest.alert.ok");
  t = callNamed("createDialogWindow", callMethod("getID", _me), "quest.dialog.testconfirmation", 2, 1);
  callMethod("setText", t, t_txt, t_title, t_btn1, t_btn2)
  callMethod("show", t)
  break;
case "help":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callNamed("executeMessage", symbol("open_help_page"), callNamed("getText", "help.quest.step1", callNamed("getText", "help.quest", "help.quest")))
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Unknown qe-elem:", a_sElemID))
  break;
  break;
  }

  }

}

