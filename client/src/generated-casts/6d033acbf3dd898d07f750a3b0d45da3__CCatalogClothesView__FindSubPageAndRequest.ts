// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogClothesView / FindSubPageAndRequest

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function FindSubPageAndRequest(_me: LingoMe, _this: LingoValue, a_iLand: LingoValue, a_mpItemList: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", a_iLand)) ? 0 : 1)) {
  for (var h = 1; h <= a_mpItemList.count; ++h) {
  if (lingoBinary("eq", a_mpItemList[h].id, a_iLand)) {
  setThePropOf(a_mpItemList[h], "state", 1);
  for (var s = 4; s <= a_mpItemList[h].count; ++s) {
  if (lingoBinary("contains", callMethod("getPropAt", a_mpItemList[h], s), meProp(_me, "m_sActiveCategory"))) {
  setMeProp(_me, "m_iDefinedPageToShow", a_mpItemList[h][s].id);
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 16, new LingoPropList([symbol("int"), meProp(_me, "m_iDefinedPageToShow")]))
  }

  }

  }

  }

  }

}

