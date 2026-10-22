// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskPlaceMultipleItems / merge

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function merge(_me: LingoMe, a_rWindow: LingoValue) {
  setMeProp(_me, "m_rWindow", a_rWindow);
  var t_bSuccess = callMethod("merge", meProp(_me, "m_rWindow"), "vmk_quest_place_multi.window");
  var t_rTitleElem = callMethod("getElement", meProp(_me, "m_rWindow"), "quest.dialog.hd");
  if (lingoBinary("neq", t_rTitleElem, 0)) {
  callMethod("setText", t_rTitleElem, callNamed("getText", "quest.dialog.hd.placemulti"))
  }

  var t_ar_items = new LingoPropList([]);
  t_ar_items["1"] = new LingoPropList([symbol("ItemId"), 383, symbol("icon"), "icon.skull"]);
  t_ar_items["2"] = new LingoPropList([symbol("ItemId"), 384, symbol("icon"), "icon.atom"]);
  t_ar_items["3"] = new LingoPropList([symbol("ItemId"), 385, symbol("icon"), "icon.diamond"]);
  t_ar_items["4"] = new LingoPropList([symbol("ItemId"), 386, symbol("icon"), "icon.horseshoe"]);
  t_ar_items["5"] = new LingoPropList([symbol("ItemId"), 387, symbol("icon"), "icon.cloverleaf"]);
  t_ar_items["6"] = new LingoPropList([symbol("ItemId"), 400, symbol("icon"), "icon.mickey"]);
  callMethod("render", meProp(_me, "m_rGrid"), t_ar_items, callMethod("getElement", meProp(_me, "m_rWindow"), "quest.itemlist"))
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.placewhat", callNamed("getText", "quest.placewhat.383"))
  callMethod("setButtonState", _me, meProp(_me, "m_rWindow"), "quest.place.continue", 0)
  callMethod("setAmount", _me, meProp(_me, "m_ar_defaults")[symbol("default")])
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.items.dropped", meProp(_me, "m_ar_items").count._string)
  callMethod("setButtonTxt", _me, meProp(_me, "m_rWindow"), "quest.pickup.button", callNamed("getText", "quest.pickup", callNamed("getText", "quest.pickup.button", "PICK UP")))
  var t_rManager = callMethod("getManager", _me);
  var t_ar_data = new LingoPropList([]);
  if (callNamed("objectp", t_rManager)) {
  var t_ar_results = callMethod("getResults", t_rManager);
  if (callNamed("listp", t_ar_results)) {
  for (var i = 1; i <= t_ar_results.count; ++i) {
  var t_iProp = callMethod("getPropAt", t_ar_results, i);
  var t_iValue = t_ar_results[i];
  if (lingoBinary("eq", t_iProp, symbol("itemsData"))) {
  t_ar_data[symbol("item_count")] = t_iValue.count;
  t_ar_data[symbol("item_array")] = t_iValue;
  continue;
  }

  t_ar_data[t_iProp] = t_iValue;
  }

  if (lingoBinary("gt", t_ar_data.count, 0)) {
  callMethod("rawData", _me, t_ar_data)
  }

  }

  }

  return t_bSuccess;
}

