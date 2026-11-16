// 38365562899c7799eeaea4a99041ea57.cct / CQuestNotificationPrizeData / _EventProc

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
case "quest.prizes":
  var t_ar_event = new LingoPropList([symbol("found"), 0, symbol("event"), "", symbol("client"), undefined, symbol("route"), new LingoPropList([])]);
  var t_rComponentPage = meProp(_me, "m_ar_components")[a_sElemID];
  callMethod("EventProc", t_rComponentPage, a_vParam, t_ar_event)
  if (t_ar_event.found) {
  var t_rClientElement = callMethod("getElement", tWndObj, a_sElemID);
  switch (t_ar_event.event) {
case "quest.prizes.less":
  var t_iRank = lingoBinary("sub", callMethod("getComponentID", t_rComponentPage, t_ar_event.route.component), 1);
  callMethod("MoveItemIndex", _me, t_iRank, -float(1), 2)
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  break;
case "quest.prizes.more":
  t_iRank = lingoBinary("sub", callMethod("getComponentID", t_rComponentPage, t_ar_event.route.component), 1);
  callMethod("MoveItemIndex", _me, t_iRank, 1, 2)
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  break;
case "quest.prizes.1":
case "quest.prizes.2":
  if (theProperty("doubleClick")) {
  var t_iShift = 0;
  if (lingoBinary("eq", t_ar_event.event, "quest.prizes.2")) {
  t_iShift = 1;
  }

  var t_rActiveLayout = callMethod("GetActive", t_rComponentPage);
  var t_rNode = new LingoPropList([symbol("itemCode"), -float(1)]);
  if (callNamed("objectp", t_rActiveLayout)) {
  t_rNode = callMethod("GetNode", t_rActiveLayout);
  }

  if (lingoBinary("gt", t_rNode.itemCode, 0)) {
  t_iRank = lingoBinary("sub", callMethod("getComponentID", t_rComponentPage, t_ar_event.route.component), 1);
  var t_iItemIndex = lingoBinary("sub", lingoBinary("add", meProp(_me, "m_ar_data").remaining_prize_array[lingoBinary("add", t_iRank, 1)].item_index, t_iShift), 1);
  if (callNamed("listp", meProp(_me, "m_ar_data"))) {
  var t_ID = meProp(_me, "m_ar_data")[symbol("questTemplateId")];
  callMethod("GetPrizeItemDetails", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), new LingoList([t_ID, lingoBinary("add", meProp(_me, "m_ar_data")[symbol("taken_prize_count")], t_iRank), t_iItemIndex]))
  }

  }

  }

  break;
  break;
  }

  }

  break;
case "mes.accept.button":
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
  callNamed("executeMessage", symbol("open_help_page"), callNamed("getText", "help.quest.prizesvisible", callNamed("getText", "help.quest", "help.quest")))
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "InQuest.dialog.QuestCompleted.event:", a_sElemID))
  }

  }

}

