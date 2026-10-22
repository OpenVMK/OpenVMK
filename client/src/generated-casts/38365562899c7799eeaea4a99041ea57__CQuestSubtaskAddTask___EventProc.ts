// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskAddTask / _EventProc

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
case "quest.newtasks":
  var t_ar_event = new LingoPropList([symbol("found"), 0, symbol("event"), "", symbol("client"), undefined, symbol("route"), new LingoPropList([])]);
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  var t_rComponent = meProp(_me, "m_ar_components")[a_sElemID];
  callMethod("EventProc", t_rComponent, a_vParam, t_ar_event)
  if (t_ar_event.found) {
  var t_rClientElement = callMethod("getElement", meProp(_me, "m_rWindow"), a_sElemID);
  var t_rImg = callMethod("render", t_rComponent);
  callMethod("feedImage", t_rClientElement, t_rImg)
  var t_rInfoElement = callMethod("getElement", meProp(_me, "m_rWindow"), meProp(_me, "m_sInfoTarget"));
  if (lingoBinary("neq", t_rInfoElement, 0)) {
  var t_rNode = callMethod("GetNode", t_ar_event.route.layout);
  if (callNamed("listp", t_rNode)) {
  var t_sInfoText = t_rNode["INFO"];
  callMethod("setText", t_rInfoElement, callNamed("getText", t_sInfoText))
  switch (callMethod("getEvent", t_ar_event.route.layout)) {
case "addtask.5":
  var t_bSend = 1;
  if (lingoBinary("neq", callNamed("getObject", "MagicMenu"), 0)) {
  var t_rMagic = callNamed("getObject", "MagicMenu");
  t_bSend = lingoBinary("eq", t_rMagic.m_mp_FxList.count, 0);
  }

  if (t_bSend) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "QueryMagicFx")
  }

  break;
  }

  }

  }

  if (theProperty("doubleClick")) {
  callMethod("proceedWithSelectedTask", _me)
  }

  }

  break;
case "mes.accept.button":
  callMethod("proceedWithSelectedTask", _me)
  break;
case "close":
case "quest.quit":
case "mes.deny.button":
  var t_rManager = callMethod("getManager", _me);
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
  callNamed("put", lingoBinary("joinPad", "Subtask.AddTask.event:", a_sElemID))
  break;
  break;
  }

  }

}

