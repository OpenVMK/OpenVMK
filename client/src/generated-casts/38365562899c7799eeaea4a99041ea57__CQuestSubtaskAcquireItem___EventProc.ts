// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskAcquireItem / _EventProc

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
case "tra.objects":
  callMethod("MouseSelection", meProp(_me, "m_rGrid"), a_vParam)
  if (theProperty("doubleClick")) {
  callNamed("put", "select an move on")
  }

  break;
case "tra.tab.furniture.passive":
  setMeProp(_me, "m_sSelectedTab", "furniture");
  callMethod("HideTabs", _me)
  var t = new LingoPropList([]);
  if (callMethod("GetItemsByCategory", callMethod("getComponent", callNamed("getThread", "inventory")), symbol("items"), t)) {
  callMethod("update", _me, t, symbol("items"))
  } else {
  callNamed("put", "Could not get items-data from inventory")
  }

  break;
case "tra.tab.pins.passive":
  setMeProp(_me, "m_sSelectedTab", "pins");
  callMethod("HideTabs", _me)
  t = new LingoPropList([]);
  if (callMethod("GetItemsByCategory", callMethod("getComponent", callNamed("getThread", "inventory")), symbol("pins"), t)) {
  callMethod("update", _me, t, symbol("pins"))
  } else {
  callNamed("put", "Could not get pins-data from inventory")
  }

  break;
case "tra.tab.clothes.passive":
  setMeProp(_me, "m_sSelectedTab", "clothes");
  callMethod("HideTabs", _me)
  t = new LingoPropList([]);
  if (callMethod("GetItemsByCategory", callMethod("getComponent", callNamed("getThread", "inventory")), symbol("clothes"), t)) {
  callMethod("update", _me, t, symbol("clothes"))
  } else {
  callNamed("put", "Could not get clothes-data from inventory")
  }

  break;
case "tra.tab.posters.passive":
  setMeProp(_me, "m_sSelectedTab", "posters");
  callMethod("HideTabs", _me)
  t = new LingoPropList([]);
  if (callMethod("GetItemsByCategory", callMethod("getComponent", callNamed("getThread", "inventory")), symbol("posters"), t)) {
  callMethod("update", _me, t, symbol("posters"))
  } else {
  callNamed("put", "Could not get posters-data from inventory")
  }

  break;
case "quest.magics":
  break;
case "mes.accept.button":
  var t_bDataOK = 0;
  var t_rSelected = callMethod("GetSelected", meProp(_me, "m_rGrid"));
  if ((lingoTruthy(callNamed("voidp", t_rSelected)) ? 0 : 1)) {
  var t_ar_results = new LingoPropList([]);
  t_ar_results[symbol("itemCode")] = callMethod("GetSelected", meProp(_me, "m_rGrid"))[symbol("code")];
  if (callNamed("objectp", t_rManager)) {
  callMethod("appendSubResult", t_rManager, t_ar_results)
  callMethod("resolveSubtask", t_rManager)
  callMethod("Activate", t_rManager)
  }

  t_bDataOK = 1;
  }

  if ((lingoTruthy(t_bDataOK) ? 0 : 1)) {
  var t_txt = callNamed("getText", "quest.alert.acquireitem.missing");
  var t_title = callNamed("getText", "quest.alert.title");
  var t_btn1 = callNamed("getText", "quest.alert.ok");
  t = callNamed("createDialogWindow", callMethod("getID", _me), "quest.alert.acquireitem", 1, 1);
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
  callNamed("put", lingoBinary("joinPad", "Subtask.Magics.event:", a_sElemID))
  break;
  break;
  }

  }

}

