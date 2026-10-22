// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskMinigame / _EventProc

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
  if (lingoBinary("eq", a_kEvent, symbol("mouseDown"))) {
  switch (a_sElemID) {
case "quest.scorelimit.up":
  setMeProp(_me, "m_iScoreState", symbol("toprize"));
  callNamed("createTimeout", "updateScore", 50, symbol("updateAmount"), callMethod("getID", _me), undefined, undefined)
  break;
case "quest.scorelimit.down":
  setMeProp(_me, "m_iScoreState", symbol("fromprize"));
  callNamed("createTimeout", "updateScore", 50, symbol("updateAmount"), callMethod("getID", _me), undefined, undefined)
  break;
  }

  } else {
  if (lingoBinary("eq", a_kEvent, symbol("mouseUp"))) {
  setMeProp(_me, "m_iScoreState", symbol("inactive"));
  if (callNamed("timeoutExists", "updateScore")) {
  callNamed("removeTimeout", "updateScore")
  }

  switch (a_sElemID) {
case "quest.gamelist":
  var t_ar_event = new LingoPropList([symbol("found"), 0, symbol("event"), "", symbol("client"), undefined, symbol("route"), new LingoPropList([])]);
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  var t_rComponent = meProp(_me, "m_ar_components")[a_sElemID];
  callMethod("EventProc", t_rComponent, a_vParam, t_ar_event)
  if (t_ar_event.found) {
  var t_rClientElement = callMethod("getElement", meProp(_me, "m_rWindow"), a_sElemID);
  var t_rImg = callMethod("render", t_rComponent);
  callMethod("feedImage", t_rClientElement, t_rImg)
  callMethod("updateDefaults", _me)
  }

  break;
case "mes.accept.button":
  t_rComponent = meProp(_me, "m_ar_components")["quest.gamelist"];
  var t_rActiveTask = callMethod("GetActive", t_rComponent);
  var t_bDataOK = 0;
  var t_ar_results = new LingoPropList([]);
  if (lingoBinary("gt", meProp(_me, "m_iCurrentScore"), 0)) {
  if (callNamed("objectp", t_rActiveTask)) {
  var t_iID = callNamed("integer", callMethod("getEvent", t_rActiveTask));
  if (lingoBinary("gt", t_iID, 0)) {
  t_ar_results[symbol("GameID")] = t_iID;
  t_ar_results[symbol("score")] = meProp(_me, "m_iCurrentScore");
  var t_rManager = callMethod("getManager", _me);
  if (callNamed("objectp", t_rManager)) {
  callMethod("appendSubResult", t_rManager, t_ar_results)
  callMethod("resolveSubtask", t_rManager)
  callMethod("Activate", t_rManager)
  }

  t_bDataOK = 1;
  }

  }

  }

  if ((lingoTruthy(t_bDataOK) ? 0 : 1)) {
  var t_txt = callNamed("getText", "quest.alert.select.minigame");
  var t_title = callNamed("getText", "quest.alert.title");
  var t_btn1 = callNamed("getText", "quest.alert.ok");
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "quest.alert.minigame", 1, 1);
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
  callNamed("put", lingoBinary("joinPad", "Subtask.Minigame.event:", a_sElemID))
  break;
  break;
  }

  }

  }

}

