// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryContainer / SortItemListByCategory

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SortItemListByCategory(_me: LingoMe, _this: LingoValue, a_kCat: LingoValue) {
  if (lingoBinary("or", lingoBinary("eq", a_kCat, symbol("all")), callNamed("voidp", a_kCat))) {
  for (var i = 1; i <= meProp(_me, "m_mp_kCat_rGroups").count; ++i) {
  var t_kCat = callMethod("getPropAt", meProp(_me, "m_mp_kCat_rGroups"), i);
  callMethod("SortItemListByCategory", _this, t_kCat)
  }

  } else {
  var t_rCategory = meProp(_me, "m_mp_kCat_rGroups")[a_kCat];
  var t_rSortBuffer = new LingoPropList([]);
  var t_iCount = t_rCategory.count;
  for (var t = 1; t <= t_iCount; ++t) {
  var t_sName = callNamed("getText", lingoBinary("join", "item.", callMethod("getaProp", t_rCategory[t], symbol("code"))), "");
  callMethod("addProp", t_rSortBuffer, t_sName, callMethod("getPropAt", t_rCategory, t))
  }

  callMethod("sort", t_rSortBuffer)
  var t_rNewItemList = new LingoPropList([]);
  for (var t = 1; t <= t_iCount; ++t) {
  var t_sGroup = t_rSortBuffer[t];
  callMethod("addProp", t_rNewItemList, t_sGroup, callMethod("getaProp", t_rCategory, t_sGroup))
  }

  callMethod("setaProp", meProp(_me, "m_mp_kCat_rGroups"), a_kCat, t_rNewItemList)
  }

}

