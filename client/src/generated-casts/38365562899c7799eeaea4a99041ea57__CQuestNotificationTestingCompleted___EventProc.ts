// 38365562899c7799eeaea4a99041ea57.cct / CQuestNotificationTestingCompleted / _EventProc

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
case "quest.back":
  var t_ID = meProp(_me, "m_ar_data")[symbol("questTemplateId")];
  callMethod("GotoQuestEngineItem", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), new LingoList([t_ID]))
  if (callNamed("objectp", t_rManager)) {
  callNamed("removeObject", callMethod("getID", t_rManager))
  }

  break;
case "quest.tryagain":
  t_ID = meProp(_me, "m_ar_data")[symbol("questTemplateId")];
  callMethod("RetestQuest", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), new LingoList([t_ID]))
  if (callNamed("objectp", t_rManager)) {
  callNamed("removeObject", callMethod("getID", t_rManager))
  }

  break;
case "quest.info":
  t_ID = meProp(_me, "m_ar_data")[symbol("questTemplateId")];
  callMethod("GetQuestInstanceData", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), new LingoList([t_ID]))
  if (callNamed("objectp", t_rManager)) {
  callNamed("removeObject", callMethod("getID", t_rManager))
  }

  break;
case "quest.quit":
  callMethod("QuitQuest", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))))
  if (callNamed("objectp", t_rManager)) {
  callNamed("removeObject", callMethod("getID", t_rManager))
  }

  break;
case "mes.accept.button":
  if (callNamed("objectp", t_rManager)) {
  callNamed("removeObject", callMethod("getID", t_rManager))
  }

  break;
case "quest.continue":
  if (callNamed("objectp", t_rManager)) {
  callNamed("removeObject", callMethod("getID", t_rManager))
  }

  break;
case "close":
  if (callNamed("objectp", t_rManager)) {
  callNamed("removeObject", callMethod("getID", t_rManager))
  }

  break;
case "help":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callNamed("executeMessage", symbol("open_help_page"), callNamed("getText", "help.quest.test", callNamed("getText", "help.quest", "help.quest")))
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "InQuest.dialog.TaskCompleted.event:", a_sElemID))
  }

  }

}

