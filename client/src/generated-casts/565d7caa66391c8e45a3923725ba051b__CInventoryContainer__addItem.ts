// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryContainer / addItem

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addItem(_me: LingoMe, _this: LingoValue, a_kCat: LingoValue, a_iNewRef: LingoValue, a_mp_item: LingoValue, a_mp_details: LingoValue, a_sGroup: LingoValue) {
  if (lingoBinary("or", lingoBinary("eq", a_kCat, symbol("all")), callNamed("voidp", a_kCat))) {
  var t_kCat = symbol("undefined");
  } else {
  t_kCat = a_kCat;
  }

  a_mp_item = callMethod("duplicate", a_mp_item);
  callMethod("setaProp", a_mp_item, symbol("ref"), a_iNewRef)
  callMethod("setaProp", a_mp_item, symbol("group"), a_sGroup)
  callMethod("setaProp", a_mp_item, symbol("items"), 1)
  if ((lingoTruthy(callNamed("voidp", a_mp_item)) ? 0 : 1)) {
  if (callNamed("voidp", callMethod("getaProp", meProp(_me, "m_mp_kCat_rGroups")[t_kCat], a_sGroup))) {
  callMethod("setaProp", meProp(_me, "m_mp_kCat_rGroups")[t_kCat], a_sGroup, a_mp_item)
  } else {
  setThePropOf(callMethod("getaProp", meProp(_me, "m_mp_kCat_rGroups")[t_kCat], a_sGroup), "ref", a_iNewRef);
  }

  }

  if ((lingoTruthy(callNamed("voidp", a_mp_details)) ? 0 : 1)) {
  callMethod("setaProp", meProp(_me, "m_mp_kCat_rDetails")[t_kCat], a_sGroup, callMethod("duplicate", a_mp_details))
  }

  callMethod("SortItemListByCategory", _this, t_kCat)
  for (var t_rCallback of meProp(_me, "m_ar_mp_itemListCallbacks").toArray()) {
  callNamed("call", t_rCallback[symbol("method")], t_rCallback[symbol("target")], meProp(_me, "m_mp_kCat_rGroups"), t_kCat)
  }

  for (var t_rCallback of meProp(_me, "m_ar_mp_detailsCallbacks").toArray()) {
  callNamed("call", t_rCallback[symbol("method")], t_rCallback[symbol("target")], meProp(_me, "m_mp_kCat_rDetails"), t_kCat)
  }

}

