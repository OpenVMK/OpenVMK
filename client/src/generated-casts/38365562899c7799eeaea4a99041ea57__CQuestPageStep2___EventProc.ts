// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep2 / _EventProc

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
  var t_rOwner = callMethod("GetOwner", t_rManager);
  if (lingoBinary("eq", a_kEvent, symbol("mouseDown"))) {
  switch (a_sElemID) {
case "quest.credits.toprize":
  setMeProp(_me, "m_iCreditsState", symbol("toprize"));
  callNamed("createTimeout", "updatePrize", 100, symbol("updatePrize"), callMethod("getID", _me), undefined, undefined)
  break;
case "quest.credits.fromprize":
  setMeProp(_me, "m_iCreditsState", symbol("fromprize"));
  callNamed("createTimeout", "updatePrize", 100, symbol("updatePrize"), callMethod("getID", _me), undefined, undefined)
  break;
  }

  } else {
  if (lingoBinary("eq", a_kEvent, symbol("mouseUp"))) {
  setMeProp(_me, "m_iCreditsState", symbol("inactive"));
  if (callNamed("timeoutExists", "updatePrize")) {
  callNamed("removeTimeout", "updatePrize")
  }

  switch (a_sElemID) {
case "quest.inventory":
  callMethod("MouseSelection", meProp(_me, "m_rGridRenderer"), a_vParam)
  if (theProperty("doubleClick")) {
  callMethod("addSelectedItem", _me)
  }

  break;
case "quest.selectprize.button":
  if (lingoBinary("eq", meProp(_me, "m_sSelectedTab"), "credits")) {
  callMethod("addCreditsToSelectedPrize", _me)
  } else {
  callMethod("addSelectedItem", _me)
  }

  break;
case "quest.removeprize.button":
  callMethod("removeSelectedItemFromPrize", _me)
  break;
case "tab.furnishings.passive":
  setMeProp(_me, "m_sSelectedTab", "furnishings");
  callMethod("HideTabs", _me)
  callMethod("creditsState", _me, 0)
  var t = new LingoPropList([]);
  if (callMethod("GetItemsByCategory", callMethod("getComponent", callNamed("getThread", "inventory")), symbol("items"), t)) {
  callMethod("update", _me, t, symbol("items"))
  } else {
  callNamed("put", "Could not get items-data from inventory")
  }

  break;
case "tab.pins.passive":
  setMeProp(_me, "m_sSelectedTab", "pins");
  callMethod("HideTabs", _me)
  callMethod("creditsState", _me, 0)
  t = new LingoPropList([]);
  if (callMethod("GetItemsByCategory", callMethod("getComponent", callNamed("getThread", "inventory")), symbol("pins"), t)) {
  callMethod("update", _me, t, symbol("pins"))
  } else {
  callNamed("put", "Could not get pins-data from inventory")
  }

  break;
case "tab.posters.passive":
  setMeProp(_me, "m_sSelectedTab", "posters");
  callMethod("HideTabs", _me)
  t = new LingoPropList([]);
  if (callMethod("GetItemsByCategory", callMethod("getComponent", callNamed("getThread", "inventory")), symbol("posters"), t)) {
  callMethod("update", _me, t, symbol("posters"))
  } else {
  callNamed("put", "Could not get posters-data from inventory")
  }

  break;
case "tab.clothing.passive":
  setMeProp(_me, "m_sSelectedTab", "clothing");
  callMethod("HideTabs", _me)
  callMethod("creditsState", _me, 0)
  t = new LingoPropList([]);
  if (callMethod("GetItemsByCategory", callMethod("getComponent", callNamed("getThread", "inventory")), symbol("clothes"), t)) {
  callMethod("update", _me, t, symbol("clothes"))
  } else {
  callNamed("put", "Could not get clothes-data from inventory")
  }

  break;
case "tab.credits.passive":
  setMeProp(_me, "m_sSelectedTab", "credits");
  callMethod("HideTabs", _me)
  callMethod("creditsState", _me, 1)
  break;
case "quest.prizes":
  var t_ar_event = new LingoPropList([symbol("found"), 0, symbol("event"), "", symbol("client"), undefined, symbol("route"), new LingoPropList([])]);
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  var t_rComponentPage = meProp(_me, "m_ar_components")[a_sElemID];
  callMethod("EventProc", t_rComponentPage, a_vParam, t_ar_event)
  if (t_ar_event.found) {
  var t_rClientElement = callMethod("getElement", tWndObj, a_sElemID);
  switch (t_ar_event.event) {
case "quest.delete":
  var t_ar_questData = callMethod("getData", callMethod("GetOwner", callMethod("getManager", _me)));
  var t_iRank = lingoBinary("sub", callMethod("getComponentID", t_rComponentPage, t_ar_event.route.component), 1);
  callMethod("ClearPrize", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), new LingoList([t_ar_questData[symbol("questTemplateId")], t_iRank]))
  break;
case "quest.addprize":
  t_ar_questData = callMethod("getData", callMethod("GetOwner", callMethod("getManager", _me)));
  t_iRank = lingoBinary("sub", callMethod("GetComponents", t_rComponentPage).count, 1);
  callMethod("AddPrizeCredits", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), new LingoList([t_ar_questData[symbol("questTemplateId")], t_iRank, 0]))
  break;
case "quest.step2.credits":
  callMethod("showBorder", callMethod("GetActive", t_rComponentPage))
  if (theProperty("doubleClick")) {
  callMethod("removeSelectedItemFromPrize", _me)
  }

  break;
case "quest.step2.icon1":
case "quest.step2.icon2":
case "quest.step2.icon3":
  callMethod("showBorder", callMethod("GetActive", t_rComponentPage))
  if (theProperty("doubleClick")) {
  callMethod("removeSelectedItemFromPrize", _me)
  }

  break;
case "quest.step2.less":
  t_iRank = lingoBinary("sub", callMethod("getComponentID", t_rComponentPage, t_ar_event.route.component), 1);
  t_rOwner = callMethod("GetOwner", callMethod("getManager", _me));
  if (callNamed("objectp", t_rOwner)) {
  callMethod("MoveItemIndex", t_rOwner, t_iRank, -float(1))
  }

  break;
case "quest.step2.more":
  t_iRank = lingoBinary("sub", callMethod("getComponentID", t_rComponentPage, t_ar_event.route.component), 1);
  t_rOwner = callMethod("GetOwner", callMethod("getManager", _me));
  if (callNamed("objectp", t_rOwner)) {
  callMethod("MoveItemIndex", t_rOwner, t_iRank, 1)
  }

  break;
  default:
  callNamed("put", lingoBinary("joinPad", "[Questengine.event]", t_ar_event.event))
  break;
  break;
  }

  t_rClientElement = callMethod("getElement", meProp(_me, "m_rWindow"), a_sElemID);
  var t_rImg = callMethod("render", t_rComponentPage);
  callMethod("feedImage", t_rClientElement, t_rImg)
  }

  break;
case "quest.previousstep.button":
case "quest.tab.tasks.passive":
  t_rManager = callMethod("getManager", _me);
  if (callNamed("objectp", t_rManager)) {
  callMethod("cancelSubtask", t_rManager)
  callMethod("Activate", t_rManager)
  }

  break;
case "quest.nextstep.button":
case "quest.tab.settings.passive":
  t_rManager = callMethod("getManager", _me);
  if (callNamed("objectp", t_rManager)) {
  callMethod("resolveSubtask", t_rManager)
  callMethod("Activate", t_rManager)
  }

  break;
case "close":
  callNamed("removeObject", callMethod("getID", t_rOwner))
  break;
case "quest.continuelater.button":
  if (callNamed("objectp", t_rOwner)) {
  var t_ar_results = new LingoPropList([]);
  t_ar_results[symbol("testQuest")] = 0;
  t_ar_results[symbol("releaseQuest")] = 0;
  var t_iTargetHandler = symbol("QuestDialogBroadcastEvent");
  if (lingoBinary("gt", callMethod("getOne", callMethod("handlers", t_rOwner), t_iTargetHandler), 0)) {
  callNamed("call", t_iTargetHandler, t_rOwner, callMethod("getID", _me), t_ar_results)
  }

  callNamed("removeObject", callMethod("getID", t_rOwner))
  }

  break;
case "quest.clearprizes.button":
  var t_txt = callNamed("getText", "quest.confirmation.clearprizes");
  var t_title = callNamed("getText", "quest.alert.title");
  var t_btn1 = callNamed("getText", "quest.alert.cancel");
  var t_btn2 = callNamed("getText", "quest.alert.ok");
  t = callNamed("createDialogWindow", callMethod("getID", _me), "quest.confirmation.clearprizes", 2, 1);
  callMethod("setText", t, t_txt, t_title, t_btn1, t_btn2)
  callMethod("show", t)
  break;
case "quest.credits.prize":
case "bg2":
  if (theProperty("doubleClick")) {
  callMethod("addCreditsToSelectedPrize", _me)
  }

  break;
case "quest.start.button":
  var t_bTestingRequired = 1;
  if (callNamed("objectp", t_rOwner)) {
  t_bTestingRequired = callMethod("GetTestingRequired", t_rOwner);
  }

  if (t_bTestingRequired) {
  t_txt = callNamed("getText", "quest.dialog.testconfirmation");
  } else {
  t_txt = callNamed("getText", "quest.dialog.test.notrequired");
  }

  t_title = callNamed("getText", "quest.alert.title");
  t_btn1 = callNamed("getText", "quest.alert.cancel");
  t_btn2 = callNamed("getText", "quest.alert.ok");
  t = callNamed("createDialogWindow", callMethod("getID", _me), "quest.dialog.testconfirmation", 2, 1);
  callMethod("setText", t, t_txt, t_title, t_btn1, t_btn2)
  callMethod("show", t)
  break;
case "help":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callNamed("executeMessage", symbol("open_help_page"), callNamed("getText", "help.quest.step2", callNamed("getText", "help.quest", "help.quest")))
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Unknown qe-elem:", a_sElemID))
  break;
  break;
  break;
  }

  }

  }

}

