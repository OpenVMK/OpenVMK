// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryContainer / UpdateDetails

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateDetails(_me: LingoMe, _this: LingoValue, a_kCat: LingoValue, a_mp_sGroup_rData: LingoValue) {
  var t_iCount = a_mp_sGroup_rData.count;
  if (lingoBinary("or", lingoBinary("eq", a_kCat, symbol("all")), callNamed("voidp", a_kCat))) {
  for (var j = 1; j <= t_iCount; ++j) {
  var t_rDetails = a_mp_sGroup_rData[j];
  var t_sGroup = callMethod("getPropAt", a_mp_sGroup_rData, j);
  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", meProp(_me, "m_mp_kCat_rGroups")[symbol("items")], t_sGroup))) ? 0 : 1)) {
  callMethod("setaProp", meProp(_me, "m_mp_kCat_rDetails")[symbol("items")], t_sGroup, t_rDetails)
  continue;
  }

  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", meProp(_me, "m_mp_kCat_rGroups")[symbol("pins")], t_sGroup))) ? 0 : 1)) {
  callMethod("setaProp", meProp(_me, "m_mp_kCat_rDetails")[symbol("pins")], t_sGroup, t_rDetails)
  continue;
  }

  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", meProp(_me, "m_mp_kCat_rGroups")[symbol("clothes")], t_sGroup))) ? 0 : 1)) {
  callMethod("setaProp", meProp(_me, "m_mp_kCat_rDetails")[symbol("clothes")], t_sGroup, t_rDetails)
  continue;
  }

  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", meProp(_me, "m_mp_kCat_rGroups")[symbol("posters")], t_sGroup))) ? 0 : 1)) {
  callMethod("setaProp", meProp(_me, "m_mp_kCat_rDetails")[symbol("posters")], t_sGroup, t_rDetails)
  continue;
  }

  if (callMethod("getaProp", meProp(_me, "m_mp_kCat_rGroups")[symbol("undefined")], t_sGroup)) {
  callMethod("setaProp", meProp(_me, "m_mp_kCat_rDetails")[symbol("undefined")], t_sGroup, t_rDetails)
  }

  }

  } else {
  var t_kCat = a_kCat;
  for (var j = 1; j <= t_iCount; ++j) {
  t_sGroup = callMethod("getPropAt", a_mp_sGroup_rData, j);
  t_rDetails = a_mp_sGroup_rData[j];
  callMethod("setaProp", meProp(_me, "m_mp_kCat_rDetails")[t_kCat], t_sGroup, t_rDetails)
  }

  }

  for (var t_rCallback of meProp(_me, "m_ar_mp_detailsCallbacks").toArray()) {
  callNamed("call", t_rCallback[symbol("method")], t_rCallback[symbol("target")], meProp(_me, "m_mp_kCat_rDetails"), t_kCat)
  }

}

