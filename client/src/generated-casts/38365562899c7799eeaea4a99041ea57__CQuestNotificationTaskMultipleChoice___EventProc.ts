// 38365562899c7799eeaea4a99041ea57.cct / CQuestNotificationTaskMultipleChoice / _EventProc

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
  if (lingoBinary("eq", a_kEvent, symbol("mouseUp"))) {
  switch (a_sElemID) {
case "quest.answer.button":
  callMethod("MultipleChoiseAnswer", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), new LingoList([callMethod("getValue", meProp(_me, "m_rRadioButton"))]))
  if (callNamed("objectp", t_rManager)) {
  callNamed("removeObject", callMethod("getID", t_rManager))
  }

  break;
case "quest.answer1":
case "quest.answer2":
case "quest.answer3":
case "quest.answer4":
case "quest.answer5":
  callMethod("clickElement", meProp(_me, "m_rRadioButton"), a_sElemID)
  callMethod("updateMenu", meProp(_me, "m_rRadioButton"))
  break;
case "answer1":
case "answer2":
case "answer3":
case "answer4":
case "answer5":
  callMethod("clickElement", meProp(_me, "m_rRadioButton"), lingoBinary("join", "quest.", a_sElemID))
  callMethod("updateMenu", meProp(_me, "m_rRadioButton"))
  break;
case "quest.info":
  var t_ID = meProp(_me, "m_ar_data")[symbol("questTemplateId")];
  callMethod("GetQuestInstanceData", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), new LingoList([t_ID]))
  if (callNamed("objectp", t_rManager)) {
  callNamed("removeObject", callMethod("getID", t_rManager))
  }

  break;
case "quest.quit":
  callMethod("QuitQuest", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))))
  t_rManager = callMethod("getManager", _me);
  if (callNamed("objectp", t_rManager)) {
  callNamed("removeObject", callMethod("getID", t_rManager))
  }

  break;
case "close":
case "mes.accept.button":
  if (callNamed("objectp", t_rManager)) {
  callNamed("removeObject", callMethod("getID", t_rManager))
  }

  break;
case "help":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callNamed("executeMessage", symbol("open_help_page"), callNamed("getText", "help.quest.taskhint", callNamed("getText", "help.quest", "help.quest")))
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "InQuest.dialog.TaskHint.event:", a_sElemID))
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

