// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryContainer / UpdateItemList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateItemList(_me: LingoMe, _this: LingoValue, a_kCat: LingoValue, a_mp_sGroup_rData: LingoValue) {
  if (lingoBinary("eq", a_kCat, symbol("all"))) {
  var t_kCat = symbol("undefined");
  } else {
  t_kCat = a_kCat;
  }

  var t_iCount = a_mp_sGroup_rData.count;
  var t_rDest = meProp(_me, "m_mp_kCat_rGroups")[t_kCat];
  if (lingoBinary("eq", t_kCat, symbol("undefined"))) {
  for (var j = 1; j <= t_iCount; ++j) {
  var t_sGroup = callMethod("getPropAt", a_mp_sGroup_rData, j);
  var t_rGroup = a_mp_sGroup_rData[j];
  var t_bfound = 0;
  for (var i = 1; i <= meProp(_me, "m_mp_kCat_rGroups").count; ++i) {
  var t_kTest = callMethod("getPropAt", meProp(_me, "m_mp_kCat_rGroups"), i);
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_mp_kCat_rGroups")[t_kTest][t_sGroup])) ? 0 : 1)) {
  t_bfound = 1;
  var t_rTable = new LingoPropList([]);
  callMethod("setaProp", t_rTable, t_sGroup, t_rGroup)
  callMethod("UpdateItemList", _this, t_kTest, t_rTable)
  break;
  }

  }

  if ((lingoTruthy(t_bfound) ? 0 : 1)) {
  if (lingoBinary("gt", t_rGroup.items, 0)) {
  callMethod("setaProp", meProp(_me, "m_mp_kCat_rGroups")[symbol("undefined")], t_sGroup, t_rGroup)
  continue;
  }

  callMethod("deleteProp", meProp(_me, "m_mp_kCat_rGroups")[symbol("undefined")], t_sGroup)
  callMethod("deleteProp", meProp(_me, "m_mp_kCat_rDetails")[symbol("undefined")], t_sGroup)
  }

  }

  } else {
  for (var j = 1; j <= t_iCount; ++j) {
  t_sGroup = callMethod("getPropAt", a_mp_sGroup_rData, j);
  t_rGroup = a_mp_sGroup_rData[j];
  if (lingoBinary("gt", t_rGroup.items, 0)) {
  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", t_rDest, t_sGroup))) ? 0 : 1)) {
  var t_rOld = callMethod("getaProp", t_rDest, t_sGroup);
  setThePropOf(t_rOld, "ref", t_rGroup.ref);
  setThePropOf(t_rOld, "items", t_rGroup.items);
  if (callNamed("integerp", callMethod("getaProp", t_rGroup, symbol("param")))) {
  callMethod("setaProp", t_rOld, symbol("param"), callMethod("getaProp", t_rGroup, symbol("param")))
  }

  } else {
  callMethod("setaProp", t_rDest, t_sGroup, a_mp_sGroup_rData[j])
  }

  } else {
  callMethod("deleteProp", t_rDest, t_sGroup)
  callMethod("deleteProp", meProp(_me, "m_mp_kCat_rDetails")[t_kCat], t_sGroup)
  }

  t_rGroup = callMethod("getaProp", meProp(_me, "m_mp_kCat_rDetails")[symbol("undefined")], t_sGroup);
  if ((lingoTruthy(callNamed("voidp", t_rGroup)) ? 0 : 1)) {
  callMethod("setaProp", meProp(_me, "m_mp_kCat_rDetails")[t_kCat], t_sGroup, t_rGroup)
  callMethod("deleteProp", meProp(_me, "m_mp_kCat_rDetails")[symbol("undefined")], t_sGroup)
  }

  }

  }

  callMethod("SortItemListByCategory", _this, a_kCat)
  for (var t_rCallback of meProp(_me, "m_ar_mp_itemListCallbacks").toArray()) {
  callNamed("call", t_rCallback[symbol("method")], t_rCallback[symbol("target")], meProp(_me, "m_mp_kCat_rGroups"), t_kCat)
  }

}

