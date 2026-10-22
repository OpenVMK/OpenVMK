// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep3 / _EventProc

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
  var t_rOwner = callMethod("GetOwner", t_rManager);
  if (lingoBinary("or", lingoBinary("eq", a_kEvent, symbol("keyUp")), lingoBinary("eq", a_kEvent, symbol("keyDown")))) {
  callMethod("setTestingStatus", _me, callMethod("checkCannedFields", _me))
  switch (a_sElemID) {
case "quest.questname.input1":
case "quest.description.input2":
  return callMethod("_EventProc", meProp(_me, "m_ar_CannedFields")[a_sElemID], a_kEvent, a_sElemID, a_vParam);
  break;
  }

  }

  if (lingoBinary("eq", a_kEvent, symbol("mouseUp"))) {
  switch (a_sElemID) {
case "quest.previousstep.button":
case "quest.tab.prizes.passive":
case "quest.tab.tasks.passive":
  callMethod("saveCurrentDataToOwner", _me)
  if (callNamed("objectp", t_rManager)) {
  callMethod("cancelSubtask", t_rManager)
  if (lingoBinary("eq", a_sElemID, "quest.tab.tasks.passive")) {
  callMethod("cancelSubtask", t_rManager)
  }

  callMethod("Activate", t_rManager)
  }

  break;
case "quest.type1.button":
case "quest.type2.button":
  callMethod("clickElement", meProp(_me, "m_rRadioButton"), a_sElemID)
  callMethod("updateMenu", meProp(_me, "m_rRadioButton"))
  break;
case "quest.type1.hd":
case "quest.type2.hd":
  callMethod("clickElement", meProp(_me, "m_rRadioButton"), callNamed("replaceChunks", a_sElemID, "hd", "button"))
  callMethod("updateMenu", meProp(_me, "m_rRadioButton"))
  break;
case "quest.start.button":
  if (callMethod("checkCannedFields", _me)) {
  callMethod("saveCurrentDataToOwner", _me)
  var t_bTestingRequired = 1;
  if (callNamed("objectp", t_rOwner)) {
  t_bTestingRequired = callMethod("GetTestingRequired", t_rOwner);
  }

  if (t_bTestingRequired) {
  var t_txt = callNamed("getText", "quest.dialog.testconfirmation");
  } else {
  t_txt = callNamed("getText", "quest.dialog.test.notrequired");
  }

  var t_title = callNamed("getText", "quest.alert.title");
  var t_btn1 = callNamed("getText", "quest.alert.cancel");
  var t_btn2 = callNamed("getText", "quest.alert.ok");
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "quest.dialog.testconfirmation", 2, 1);
  callMethod("setText", t, t_txt, t_title, t_btn1, t_btn2)
  callMethod("show", t)
  } else {
  t_txt = callNamed("getText", "quest.alert.questname.missing");
  t_title = callNamed("getText", "quest.alert.title");
  t_btn1 = callNamed("getText", "quest.alert.ok");
  t = callNamed("createDialogWindow", callMethod("getID", _me), "quest.alert.questname", 1, 1);
  callMethod("setText", t, t_txt, t_title, t_btn1)
  callMethod("show", t)
  }

  break;
case "quest.settime.button":
  var t_sTime = callMethod("getText", callMethod("getElement", meProp(_me, "m_rWindow"), "quest.timetotal"));
  callNamed("CreateQuestNotification", "QuestNotificationStep3SetTime", _me, new LingoList(["selectduration"]), "maker", new LingoPropList([symbol("duration"), callNamed("time2seconds", t_sTime)]))
  break;
case "close":
  callNamed("removeObject", callMethod("getID", t_rOwner))
  break;
case "quest.continuelater.button":
  callMethod("saveCurrentDataToOwner", _me)
  if (callMethod("checkCannedFields", _me)) {
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

  } else {
  t_txt = callNamed("getText", "quest.alert.description.missing");
  t_title = callNamed("getText", "quest.alert.title");
  t_btn1 = callNamed("getText", "quest.alert.ok");
  t = callNamed("createDialogWindow", callMethod("getID", _me), "quest.alert.description", 1, 1);
  callMethod("setText", t, t_txt, t_title, t_btn1)
  callMethod("show", t)
  }

  break;
case "help":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callNamed("executeMessage", symbol("open_help_page"), callNamed("getText", "help.quest.step3", callNamed("getText", "help.quest", "help.quest")))
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Unknown qe-elem:", a_sElemID))
  break;
  break;
  break;
  break;
  }

  }

}

