// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep1 / startEditingTask

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function startEditingTask(_me: LingoMe, a_iActiveTaskID: LingoValue) {
  var t_rOwner = callMethod("GetOwner", callMethod("getManager", _me));
  if (lingoBinary("gt", a_iActiveTaskID, 0)) {
  setMeProp(_me, "m_iActiveTaskID", a_iActiveTaskID);
  if (callNamed("objectp", t_rOwner)) {
  var t_ar_data = callMethod("getData", t_rOwner)[symbol("task_array")][meProp(_me, "m_iActiveTaskID")];
  t_ar_data[symbol("questTemplateId")] = callMethod("getData", t_rOwner)[symbol("questTemplateId")];
  t_ar_data[symbol("activeTaskRank")] = lingoBinary("sub", meProp(_me, "m_iActiveTaskID"), 1);
  var t_ar_subtasks = new LingoList([]);
  var t_bDefinitionOK = 1;
  switch (t_ar_data[symbol("taskType")]) {
case 1:
  t_ar_subtasks = new LingoList(["visitnpc"]);
  break;
case 2:
  t_ar_subtasks = new LingoList([]);
  break;
case 3:
  t_ar_subtasks = new LingoList(["roomvisit"]);
  break;
case 4:
  t_ar_subtasks = new LingoList(["minigame"]);
  break;
case 5:
  t_ar_subtasks = new LingoList(["magics"]);
  break;
case 6:
  t_ar_subtasks = new LingoList([]);
  t_bDefinitionOK = 0;
  break;
case 7:
  t_ar_subtasks = new LingoList(["sayword"]);
  break;
case 8:
  t_ar_subtasks = new LingoList(["spendcredits"]);
  break;
case 9:
  t_ar_subtasks = new LingoList(["earncredits"]);
  break;
case 10:
  t_ar_subtasks = new LingoList([]);
  t_bDefinitionOK = 0;
  break;
case 11:
  t_ar_subtasks = new LingoList([]);
  t_bDefinitionOK = 0;
  break;
case 12:
  t_ar_subtasks = new LingoList(["emote"]);
  break;
case 13:
  t_ar_subtasks = new LingoList([]);
  t_bDefinitionOK = 0;
  break;
case 14:
  t_ar_subtasks = new LingoList([]);
  t_bDefinitionOK = 0;
  break;
case 15:
  t_ar_subtasks = new LingoList(["acquireitem"]);
  break;
case 16:
  t_ar_subtasks = new LingoList([]);
  t_bDefinitionOK = 0;
  break;
case 17:
  t_ar_subtasks = new LingoList(["multichoicetask"]);
  break;
case 18:
  t_ar_subtasks = new LingoList(["collect"]);
  break;
case 19:
  t_ar_subtasks = new LingoList([]);
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Unknown task, can not edit:", t_ar_data))
  t_ar_subtasks = new LingoList([]);
  t_bDefinitionOK = 0;
  }

  if ((lingoTruthy(t_bDefinitionOK) ? 0 : 1)) {
  var t_txt = callNamed("getText", "quest.alert.updatetask.missing");
  var t_title = callNamed("getText", "quest.alert.title");
  var t_btn1 = callNamed("getText", "quest.alert.ok");
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "quest.alert.updatetask", 1, 1);
  callMethod("setText", t, t_txt, t_title, t_btn1)
  callMethod("show", t)
  } else {
  if (lingoBinary("eq", t_ar_data[symbol("taskType")], 2)) {
  callNamed("CreateQuestNotification", "QuestPlaceItemUpdate", callMethod("getComponent", callNamed("getThread", symbol("QuestEngine"))), new LingoList(["placeitem"]), "floating", t_ar_data)
  var t_ar_cmd = new LingoList([t_ar_data[symbol("questTemplateId")], 0, t_ar_data[symbol("taskType")], lingoBinary("sub", meProp(_me, "m_iActiveTaskID"), 1)]);
  callMethod("PrepareTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  callMethod("hide", t_rOwner)
  } else {
  if (lingoBinary("eq", t_ar_data[symbol("taskType")], 19)) {
  callNamed("CreateQuestNotification", "QuestPlaceMultiUpdate", callMethod("getComponent", callNamed("getThread", symbol("QuestEngine"))), new LingoList(["placemulti"]), "floating", t_ar_data)
  t_ar_cmd = new LingoList([t_ar_data[symbol("questTemplateId")], 0, t_ar_data[symbol("taskType")], lingoBinary("sub", meProp(_me, "m_iActiveTaskID"), 1)]);
  callMethod("PrepareTask", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), t_ar_cmd)
  callMethod("hide", t_rOwner)
  } else {
  callNamed("CreateQuestNotification", "QuestNotificationUpdateTask", _me, t_ar_subtasks, "maker", t_ar_data)
  }

  }

  }

  }

  }

}

