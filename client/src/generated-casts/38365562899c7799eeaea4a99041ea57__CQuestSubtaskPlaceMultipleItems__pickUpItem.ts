// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskPlaceMultipleItems / pickUpItem

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function pickUpItem(_me: LingoMe) {
  var t_rObj = callMethod("_AccessIndexed", callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room"))), callMethod("get", callNamed("getObject", symbol("session")), "room_own_avatar"), "avatar");
  if (callNamed("objectp", t_rObj)) {
  var t_rTile = callNamed("GetTileAtPos", callMethod("GetAbsPos", t_rObj));
  if (callNamed("objectp", t_rTile)) {
  var t_sClass = callMethod("GetParam", t_rTile, "CLASS");
  if ((lingoTruthy(lingoBinary("eq", t_sClass, "EXIT")) ? 0 : 1)) {
  var t_iTileRef = callNamed("value", callMethod("GetParam", t_rTile, "REF"));
  var t_bfound = 0;
  var i = 0;
  for (var i = 1; i <= meProp(_me, "m_ar_items").count; ++i) {
  var t_ar_Item = meProp(_me, "m_ar_items")[i];
  if (lingoBinary("eq", t_ar_Item[symbol("tileReference")], t_iTileRef)) {
  t_bfound = 1;
  break;
  }

  }

  if (t_bfound) {
  callMethod("deleteAt", meProp(_me, "m_ar_items"), i)
  } else {
  callNamed("put", "Could not find an item at this position, please walk to an item")
  }

  var t_ar_ItemData = new LingoPropList([symbol("item_count"), meProp(_me, "m_ar_items").count, symbol("item_array"), meProp(_me, "m_ar_items")]);
  callMethod("ViewFindableItems", callMethod("getComponent", callNamed("getThread", symbol("QuestEngine"))), t_ar_ItemData)
  if (lingoBinary("gt", meProp(_me, "m_ar_items").count, 0)) {
  callMethod("setButtonState", _me, meProp(_me, "m_rWindow"), "quest.place.continue", 1)
  } else {
  callMethod("setButtonState", _me, meProp(_me, "m_rWindow"), "quest.place.continue", 0)
  }

  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.items.dropped", meProp(_me, "m_ar_items").count._string)
  meProp(_me, "m_ar_defaults")[symbol("max")] = callNamed("min", meProp(_me, "m_ar_defaults")[symbol("max")], meProp(_me, "m_ar_items").count);
  setMeProp(_me, "m_iCurrentScore", callNamed("min", meProp(_me, "m_iCurrentScore"), meProp(_me, "m_ar_defaults")[symbol("max")]));
  callMethod("setAmount", _me, meProp(_me, "m_iCurrentScore"))
  return 1;
  } else {
  var t_txt = callNamed("getText", "quest.alert.placemulti");
  var t_title = callNamed("getText", "quest.alert.title");
  var t_btn1 = callNamed("getText", "quest.alert.ok");
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "quest.alert.placeitem", 1, 1);
  callMethod("setText", t, t_txt, t_title, t_btn1)
  callMethod("show", t)
  }

  }

  }

  return 0;
}

