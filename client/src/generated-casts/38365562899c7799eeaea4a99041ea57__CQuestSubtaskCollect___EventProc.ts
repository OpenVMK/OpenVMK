// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskCollect / _EventProc

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

  if (lingoBinary("eq", a_kEvent, symbol("mouseDown"))) {
  switch (a_sElemID) {
case "quest.collectlimit.up":
  setMeProp(_me, "m_iScoreState", symbol("toprize"));
  callMethod("updateAmount", _me)
  callNamed("createTimeout", "updateScore", 100, symbol("updateAmount"), callMethod("getID", _me), undefined, undefined)
  break;
case "quest.collectlimit.down":
  setMeProp(_me, "m_iScoreState", symbol("fromprize"));
  callMethod("updateAmount", _me)
  callNamed("createTimeout", "updateScore", 100, symbol("updateAmount"), callMethod("getID", _me), undefined, undefined)
  break;
  }

  } else {
  if (lingoBinary("eq", a_kEvent, symbol("mouseUp"))) {
  setMeProp(_me, "m_iScoreState", symbol("inactive"));
  if (callNamed("timeoutExists", "updateScore")) {
  callNamed("removeTimeout", "updateScore")
  }

  switch (a_sElemID) {
case "mes.accept.button":
  var t_bDataOK = callMethod("saveData", _me);
  if (t_bDataOK) {
  callMethod("resolveSubtask", t_rManager)
  callMethod("Activate", t_rManager)
  } else {
  var t_txt = callNamed("getText", "quest.alert.collect.missing");
  var t_title = callNamed("getText", "quest.alert.title");
  var t_btn1 = callNamed("getText", "quest.alert.ok");
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "quest.alert.collect", 1, 1);
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
case "quest.collect1":
case "quest.collect2":
case "quest.collect3":
  callMethod("clickElement", meProp(_me, "m_rRadioButton"), a_sElemID)
  callMethod("updateMenu", meProp(_me, "m_rRadioButton"))
  break;
case "quest.item1.hd":
case "quest.item2.hd":
case "quest.item3.hd":
  var t_sRadioID = callNamed("replaceChunks", a_sElemID, ".hd", "");
  t_sRadioID = callNamed("replaceChunks", t_sRadioID, "item", "collect");
  callMethod("clickElement", meProp(_me, "m_rRadioButton"), t_sRadioID)
  callMethod("updateMenu", meProp(_me, "m_rRadioButton"))
  break;
case "icons":
case "icons2":
case "icons3":
  t_sRadioID = callNamed("replaceChunks", a_sElemID, "icons", "quest.collect");
  if (lingoBinary("eq", t_sRadioID, "quest.collect")) {
  t_sRadioID = lingoBinary("join", t_sRadioID, "1");
  }

  callMethod("clickElement", meProp(_me, "m_rRadioButton"), t_sRadioID)
  callMethod("updateMenu", meProp(_me, "m_rRadioButton"))
  break;
case "help":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callNamed("executeMessage", symbol("open_help_page"), callNamed("getText", "help.quest.collectables", callNamed("getText", "help.quest", "help.quest")), 1)
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Subtask.Collect.event:", a_sElemID))
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

}

