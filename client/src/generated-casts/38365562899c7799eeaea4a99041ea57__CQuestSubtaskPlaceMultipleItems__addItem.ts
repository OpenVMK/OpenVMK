// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskPlaceMultipleItems / addItem

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addItem(_me: LingoMe) {
  var t_bDataOK = 0;
  var t_rSelected = callMethod("GetSelected", meProp(_me, "m_rGrid"));
  if ((lingoTruthy(callNamed("voidp", t_rSelected)) ? 0 : 1)) {
  var t_ar_results = new LingoPropList([]);
  var t_iData = t_rSelected[symbol("ItemId")];
  callMethod("placeItem", _me, t_iData)
  t_bDataOK = 1;
  }

  if ((lingoTruthy(t_bDataOK) ? 0 : 1)) {
  var t_txt = callNamed("getText", "quest.alert.select.item");
  var t_title = callNamed("getText", "quest.alert.title");
  var t_btn1 = callNamed("getText", "quest.alert.ok");
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "quest.alert.item", 1, 1);
  callMethod("setText", t, t_txt, t_title, t_btn1)
  callMethod("show", t)
  }

  return t_bDataOK;
}

