// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineComponent / ShowFindableItem

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowFindableItem(_me: LingoMe, t_ar_data: LingoValue) {
  setMeProp(_me, "m_ar_items", undefined);
  var t_rCurrentPage = undefined;
  if (callNamed("objectp", callNamed("getObject", "QuestPlaceItemUpdate"))) {
  t_rCurrentPage = callMethod("getPage", callMethod("GetBase", callMethod("getInterface", callNamed("getObject", "QuestPlaceItemUpdate"))));
  } else {
  if (callNamed("objectp", callNamed("getObject", "QuestPlaceMultiUpdate"))) {
  t_rCurrentPage = callMethod("getPage", callMethod("GetBase", callMethod("getInterface", callNamed("getObject", "QuestPlaceMultiUpdate"))));
  } else {
  setMeProp(_me, "m_ar_items", t_ar_data);
  }

  }

  if (callNamed("objectp", t_rCurrentPage)) {
  callMethod("setItemList", t_rCurrentPage, t_ar_data)
  }

  callMethod("ViewFindableItems", _me, t_ar_data)
}

