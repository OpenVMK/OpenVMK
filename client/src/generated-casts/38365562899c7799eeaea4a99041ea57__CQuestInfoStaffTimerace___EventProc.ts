// 38365562899c7799eeaea4a99041ea57.cct / CQuestInfoStaffTimerace / _EventProc

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
case "quest.prizes":
  var t_ar_event = new LingoPropList([symbol("found"), 0, symbol("event"), "", symbol("client"), undefined, symbol("route"), new LingoPropList([])]);
  var t_rComponentPage = meProp(_me, "m_ar_components")[a_sElemID];
  callMethod("EventProc", t_rComponentPage, a_vParam, t_ar_event)
  if (t_ar_event.found) {
  var t_rClientElement = callMethod("getElement", tWndObj, a_sElemID);
  switch (t_ar_event.event) {
case "quest.prizes.less":
  var t_iRank = lingoBinary("sub", callMethod("getComponentID", t_rComponentPage, t_ar_event.route.component), 1);
  t_rOwner = callMethod("GetOwner", callMethod("getManager", _me));
  if (callNamed("objectp", t_rOwner)) {
  callMethod("MoveItemIndex", t_rOwner, t_iRank, -float(1), 2)
  }

  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  break;
case "quest.prizes.more":
  t_iRank = lingoBinary("sub", callMethod("getComponentID", t_rComponentPage, t_ar_event.route.component), 1);
  t_rOwner = callMethod("GetOwner", callMethod("getManager", _me));
  if (callNamed("objectp", t_rOwner)) {
  callMethod("MoveItemIndex", t_rOwner, t_iRank, 1, 2)
  }

  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  break;
  }

  }

  break;
case "quest.tasklist":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  t_ar_event = new LingoPropList([symbol("found"), 0, symbol("event"), "", symbol("client"), undefined, symbol("route"), new LingoPropList([])]);
  var t_rComponent = meProp(_me, "m_ar_components")[a_sElemID];
  callMethod("EventProc", t_rComponent, a_vParam, t_ar_event)
  if (t_ar_event.found) {
  t_rClientElement = callMethod("getElement", meProp(_me, "m_rWindow"), a_sElemID);
  var t_rImg = callMethod("render", t_rComponent);
  callMethod("feedImage", t_rClientElement, t_rImg)
  }

  break;
case "close":
case "mes.accept.button":
  if (callNamed("objectp", t_rOwner)) {
  callNamed("removeObject", callMethod("getID", t_rOwner))
  }

  break;
case "help":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callNamed("executeMessage", symbol("open_help_page"), callNamed("getText", "help.quest.info", callNamed("getText", "help.quest", "help.quest")))
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "InfoQuestStaffOrder:", a_sElemID))
  break;
  }

  }

}

