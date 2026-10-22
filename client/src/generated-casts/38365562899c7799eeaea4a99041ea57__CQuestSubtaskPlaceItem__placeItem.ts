// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskPlaceItem / placeItem

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function placeItem(_me: LingoMe, t_iItemCode: LingoValue) {
  var t_rObj = callMethod("_AccessIndexed", callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room"))), callMethod("get", callNamed("getObject", symbol("session")), "room_own_avatar"), "avatar");
  if (callNamed("objectp", t_rObj)) {
  var t_rTile = callNamed("GetTileAtPos", callMethod("GetAbsPos", t_rObj));
  if (callNamed("objectp", t_rTile)) {
  var t_sClass = callMethod("GetParam", t_rTile, "CLASS");
  if ((lingoTruthy(lingoBinary("eq", t_sClass, "EXIT")) ? 0 : 1)) {
  var t_iTileRef = callNamed("value", callMethod("GetParam", t_rTile, "REF"));
  callMethod("ViewFindableItems", callMethod("getComponent", callNamed("getThread", symbol("QuestEngine"))), new LingoPropList([symbol("item_count"), 1, symbol("item_array"), new LingoList([new LingoPropList([symbol("tileReference"), t_iTileRef, symbol("findableItemCode"), t_iItemCode])])]))
  callNamed("executeMessage", "PlayInterfaceSound", "QE_item_placed")
  callMethod("setButtonState", _me, meProp(_me, "m_rWindow"), "quest.place.continue", 1)
  return t_iTileRef;
  } else {
  var t_txt = callNamed("getText", "quest.alert.placeitem");
  var t_title = callNamed("getText", "quest.alert.title");
  var t_btn1 = callNamed("getText", "quest.alert.ok");
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "quest.alert.placeitem", 1, 1);
  callMethod("setText", t, t_txt, t_title, t_btn1)
  callMethod("show", t)
  }

  }

  }

  return -float(1);
}

