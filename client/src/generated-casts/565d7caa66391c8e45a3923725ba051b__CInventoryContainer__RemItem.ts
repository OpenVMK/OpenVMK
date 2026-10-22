// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryContainer / RemItem

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemItem(_me: LingoMe, _this: LingoValue, a_kCat: LingoValue, a_iRef: LingoValue, a_sGroup: LingoValue) {
  if (lingoBinary("or", lingoBinary("eq", a_kCat, symbol("all")), callNamed("voidp", a_kCat))) {
  for (var i = 1; i <= meProp(_me, "m_mp_kCat_rGroups").count; ++i) {
  if (callMethod("getaProp", meProp(_me, "m_mp_kCat_rGroups")[i], a_sGroup)) {
  return callMethod("RemItem", _this, callMethod("getPropAt", meProp(_me, "m_mp_kCat_rGroups"), i), a_iRef, a_sGroup);
  }

  }

  return callNamed("error", _this, lingoBinary("joinPad", lingoBinary("joinPad", "Tried to remove item that does not exist:", a_sGroup), a_iRef), symbol("RemItem"));
  }

  var t_rGroup = callMethod("getaProp", meProp(_me, "m_mp_kCat_rGroups")[a_kCat], a_sGroup);
  if ((lingoTruthy(callNamed("voidp", t_rGroup)) ? 0 : 1)) {
  if (lingoBinary("gt", callMethod("getaProp", t_rGroup, symbol("items")), 1)) {
  callMethod("setaProp", t_rGroup, symbol("items"), lingoBinary("sub", callMethod("getaProp", t_rGroup, symbol("items")), 1))
  } else {
  callMethod("deleteProp", meProp(_me, "m_mp_kCat_rGroups")[a_kCat], a_sGroup)
  callMethod("deleteProp", meProp(_me, "m_mp_kCat_rDetails")[a_kCat], a_sGroup)
  }

  }

  for (var t_rCallback of meProp(_me, "m_ar_mp_itemListCallbacks").toArray()) {
  callNamed("call", t_rCallback[symbol("method")], t_rCallback[symbol("target")], meProp(_me, "m_mp_kCat_rGroups"), a_kCat)
  }

  for (var t_rCallback of meProp(_me, "m_ar_mp_detailsCallbacks").toArray()) {
  callNamed("call", t_rCallback[symbol("method")], t_rCallback[symbol("target")], meProp(_me, "m_mp_kCat_rDetails"), a_kCat)
  }

  return 1;
}

