// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskRoomVisit / _EventProc

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
  if (lingoBinary("eq", a_kEvent, symbol("mouseUp"))) {
  switch (a_sElemID) {
case "quest.roomlist":
  var t_ar_event = new LingoPropList([symbol("found"), 0, symbol("event"), "", symbol("client"), undefined, symbol("route"), new LingoPropList([])]);
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  var t_rComponent = meProp(_me, "m_ar_components")[a_sElemID];
  callMethod("EventProc", t_rComponent, a_vParam, t_ar_event)
  if (t_ar_event.found) {
  switch (t_ar_event.event) {
case "land.adventureland":
case "land.frontierland":
case "land.fantasyland":
case "land.tomorrowland":
case "land.mainstreet":
case "land.ownrooms":
  callMethod("toggleShowChildren", t_ar_event.route.component)
  break;
  break;
  break;
  break;
  break;
  break;
  }

  var t_rClientElement = callMethod("getElement", meProp(_me, "m_rWindow"), a_sElemID);
  var t_rImg = callMethod("render", t_rComponent);
  callMethod("feedImage", t_rClientElement, t_rImg)
  }

  break;
case "mes.accept.button":
  t_rComponent = meProp(_me, "m_ar_components")["quest.roomlist"];
  var t_rActiveTask = callMethod("GetActive", t_rComponent);
  var t_bDataOK = 0;
  var t_ar_results = new LingoPropList([]);
  if (callNamed("objectp", t_rActiveTask)) {
  var t_sEvent = callMethod("getEvent", t_rActiveTask);
  if (lingoBinary("contains", t_sEvent, "room.")) {
  var t_oldDelim = theProperty("itemDelimiter");
  setTheProperty("itemDelimiter", ".");
  var t_iRoomTag = callNamed("integer", t_sEvent.item[2]);
  setTheProperty("itemDelimiter", t_oldDelim);
  t_ar_results[symbol("room")] = t_iRoomTag;
  var t_rManager = callMethod("getManager", _me);
  if (callNamed("objectp", t_rManager)) {
  callMethod("appendSubResult", t_rManager, t_ar_results)
  callMethod("resolveSubtask", t_rManager)
  callMethod("Activate", t_rManager)
  }

  t_bDataOK = 1;
  }

  }

  if ((lingoTruthy(t_bDataOK) ? 0 : 1)) {
  var t_txt = callNamed("getText", "quest.alert.select.room");
  var t_title = callNamed("getText", "quest.alert.title");
  var t_btn1 = callNamed("getText", "quest.alert.ok");
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "quest.alert.room", 1, 1);
  callMethod("setText", t, t_txt, t_title, t_btn1)
  callMethod("show", t)
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
  callNamed("put", lingoBinary("joinPad", "Subtask.RoomVisit.event:", a_sElemID))
  break;
  break;
  }

  }

}

