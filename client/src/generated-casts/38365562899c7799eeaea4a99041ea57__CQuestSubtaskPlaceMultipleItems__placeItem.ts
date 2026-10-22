// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskPlaceMultipleItems / placeItem

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function placeItem(_me: LingoMe, t_iItemCode: LingoValue) {
  if (lingoBinary("lt", meProp(_me, "m_ar_items").count, meProp(_me, "m_iMaxLimit"))) {
  var t_rObj = callMethod("_AccessIndexed", callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room"))), callMethod("get", callNamed("getObject", symbol("session")), "room_own_avatar"), "avatar");
  if (callNamed("objectp", t_rObj)) {
  var t_rTile = callNamed("GetTileAtPos", callMethod("GetAbsPos", t_rObj));
  if (callNamed("objectp", t_rTile)) {
  var t_sClass = callMethod("GetParam", t_rTile, "CLASS");
  if ((lingoTruthy(lingoBinary("eq", t_sClass, "EXIT")) ? 0 : 1)) {
  var t_iTileRef = callNamed("value", callMethod("GetParam", t_rTile, "REF"));
  for (var t_rItem of meProp(_me, "m_ar_items").toArray()) {
  if (lingoBinary("eq", t_rItem[symbol("tileReference")], t_iTileRef)) {
  var t_txt = callNamed("getText", "quest.alert.placemultiexist");
  var t_title = callNamed("getText", "quest.alert.title");
  var t_btn1 = callNamed("getText", "quest.alert.ok");
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "quest.alert.placemultiexist", 1, 1);
  callMethod("setText", t, t_txt, t_title, t_btn1)
  callMethod("show", t)
  return -float(1);
  }

  }

  callMethod("append", meProp(_me, "m_ar_items"), new LingoPropList([symbol("tileReference"), t_iTileRef, symbol("findableItemCode"), t_iItemCode]))
  var t_ar_ItemData = new LingoPropList([symbol("item_count"), meProp(_me, "m_ar_items").count, symbol("item_array"), meProp(_me, "m_ar_items")]);
  callMethod("ViewFindableItems", callMethod("getComponent", callNamed("getThread", symbol("QuestEngine"))), t_ar_ItemData)
  callNamed("executeMessage", "PlayInterfaceSound", "QE_item_placed")
  callMethod("setButtonState", _me, meProp(_me, "m_rWindow"), "quest.place.continue", 1)
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.items.dropped", meProp(_me, "m_ar_items").count._string)
  meProp(_me, "m_ar_defaults")[symbol("max")] = meProp(_me, "m_ar_items").count;
  return t_iTileRef;
  } else {
  t_txt = callNamed("getText", "quest.alert.placemulti");
  t_title = callNamed("getText", "quest.alert.title");
  t_btn1 = callNamed("getText", "quest.alert.ok");
  t = callNamed("createDialogWindow", callMethod("getID", _me), "quest.alert.placeitem", 1, 1);
  callMethod("setText", t, t_txt, t_title, t_btn1)
  callMethod("show", t)
  }

  }

  }

  } else {
  t_txt = callNamed("getText", "quest.alert.placemulti.maxlimit");
  t_title = callNamed("getText", "quest.alert.title");
  t_btn1 = callNamed("getText", "quest.alert.ok");
  t = callNamed("createDialogWindow", callMethod("getID", _me), "quest.alert.placemulti.maxlimit", 1, 1);
  callMethod("setText", t, t_txt, t_title, t_btn1)
  callMethod("show", t)
  }

  return -float(1);
}

