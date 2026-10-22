// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineComponent / hideFoundItem

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function hideFoundItem(_me: LingoMe, t_ar_data: LingoValue) {
  if (callNamed("listp", meProp(_me, "m_ar_items"))) {
  var t_iTileRef = callNamed("value", t_ar_data[symbol("tileReference")]);
  if (lingoBinary("eq", t_iTileRef, -float(1))) {
  var t_ar_items = new LingoList([]);
  setMeProp(_me, "m_ar_items", new LingoPropList([symbol("item_count"), t_ar_items.count, symbol("item_array"), t_ar_items]));
  } else {
  t_ar_items = meProp(_me, "m_ar_items")[symbol("item_array")];
  var t_bfound = 0;
  var i = 0;
  for (var i = 1; i <= t_ar_items.count; ++i) {
  var t_ar_Item = t_ar_items[i];
  if (lingoBinary("eq", t_ar_Item[symbol("tileReference")], t_iTileRef)) {
  t_bfound = 1;
  break;
  }

  }

  if (t_bfound) {
  callNamed("executeMessage", "PlayInterfaceSound", "QE_item_placed")
  callMethod("deleteAt", t_ar_items, i)
  } else {
  callNamed("put", "Could not find an item at this position, please walk to an item")
  }

  }

  setMeProp(_me, "m_ar_items", new LingoPropList([symbol("item_count"), t_ar_items.count, symbol("item_array"), t_ar_items]));
  callMethod("ViewFindableItems", _me, meProp(_me, "m_ar_items"))
  }

}

