// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskPlaceMultipleItems / _EventProc

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
case "quest.itemlimit.up":
  setMeProp(_me, "m_iScoreState", symbol("toprize"));
  callMethod("updateAmount", _me)
  callNamed("createTimeout", "updateScore", 100, symbol("updateAmount"), callMethod("getID", _me), undefined, undefined)
  break;
case "quest.itemlimit.down":
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
case "quest.itemlist":
  callMethod("MouseSelection", meProp(_me, "m_rGrid"), a_vParam)
  var t_rSelected = callMethod("GetSelected", meProp(_me, "m_rGrid"));
  if ((lingoTruthy(callNamed("voidp", t_rSelected)) ? 0 : 1)) {
  var t_iData = t_rSelected[symbol("ItemId")];
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.placewhat", callNamed("getText", lingoBinary("join", "quest.placewhat.", t_iData)))
  }

  break;
case "quest.pickup.button":
  callMethod("pickUpItem", _me)
  break;
case "quest.clearitems.button":
  callMethod("ClearAll", _me)
  break;
case "quest.placeitem.button":
  callMethod("addItem", _me)
  callMethod("appendResults", _me)
  break;
case "mes.accept.button":
  callMethod("appendResults", _me)
  break;
case "quest.place.continue":
  callMethod("appendResults", _me)
  callMethod("ClearAll", _me)
  if (callNamed("objectp", t_rManager)) {
  callMethod("resolveSubtask", t_rManager)
  callMethod("Activate", t_rManager)
  }

  break;
case "close":
case "quest.quit":
case "mes.deny.button":
  callMethod("ClearAll", _me)
  t_rManager = callMethod("getManager", _me);
  if (callNamed("objectp", t_rManager)) {
  callMethod("cancelSubtask", t_rManager)
  callMethod("Activate", t_rManager)
  }

  break;
case "help":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callNamed("executeMessage", symbol("open_help_page"), callNamed("getText", "help.quest.findmultiple", callNamed("getText", "help.quest", "help.quest")), 1)
  break;
  break;
  break;
  }

  }

  }

}

