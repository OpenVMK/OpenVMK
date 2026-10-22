// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskPlaceItem / _EventProc

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
case "quest.itemlist":
  callMethod("MouseSelection", meProp(_me, "m_rGrid"), a_vParam)
  var t_rSelected = callMethod("GetSelected", meProp(_me, "m_rGrid"));
  if ((lingoTruthy(callNamed("voidp", t_rSelected)) ? 0 : 1)) {
  var t_iData = t_rSelected[symbol("ItemId")];
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.placewhat", callNamed("getText", lingoBinary("join", "quest.placewhat.", t_iData)))
  }

  break;
case "quest.placeitem.button":
case "mes.accept.button":
  callMethod("appendResults", _me)
  if (theProperty("doubleClick")) {
  if (callNamed("objectp", t_rManager)) {
  callMethod("resolveSubtask", t_rManager)
  callMethod("Activate", t_rManager)
  }

  }

  break;
case "quest.place.continue":
  if (callNamed("objectp", t_rManager)) {
  callMethod("resolveSubtask", t_rManager)
  callMethod("Activate", t_rManager)
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
  callNamed("executeMessage", symbol("open_help_page"), callNamed("getText", "help.quest.placeitem", callNamed("getText", "help.quest", "help.quest")), 1)
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Subtask.PlaceItem.event:", a_sElemID))
  break;
  break;
  break;
  }

  }

}

