// 38365562899c7799eeaea4a99041ea57.cct / CQuestNotificationQuestCompleted / _EventProc

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
case "quest.rating1":
case "quest.rating2":
case "quest.rating3":
case "quest.rating4":
case "quest.rating5":
  callMethod("clickElement", meProp(_me, "m_rRadioButton"), a_sElemID)
  callMethod("updateMenu", meProp(_me, "m_rRadioButton"))
  break;
case "mes.accept.button":
  var t_ID = meProp(_me, "m_ar_data")[symbol("questTemplateId")];
  var t_iAvatarQuestId = meProp(_me, "m_ar_data")[symbol("avatarQuestId")];
  var t_iRating = callMethod("getValue", meProp(_me, "m_rRadioButton"));
  callMethod("RateQuest", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), new LingoList([t_ID, t_iAvatarQuestId, t_iRating]))
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
case "close":
  if (callNamed("objectp", t_rManager)) {
  callNamed("removeObject", callMethod("getID", t_rManager))
  }

  break;
case "help":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callNamed("executeMessage", symbol("open_help_page"), callNamed("getText", "help.quest.questcomplete", callNamed("getText", "help.quest", "help.quest")))
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "InQuest.dialog.QuestCompleted.event:", a_sElemID))
  break;
  break;
  break;
  break;
  }

  }

}

