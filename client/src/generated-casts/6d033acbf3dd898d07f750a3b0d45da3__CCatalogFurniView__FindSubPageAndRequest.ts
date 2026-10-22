// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogFurniView / FindSubPageAndRequest

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function FindSubPageAndRequest(_me: LingoMe, _this: LingoValue, a_iLand: LingoValue, a_mpItemList: LingoValue, a_sSpecialCategory: LingoValue) {
  var t_bFoundSomething = 0;
  for (var h = 1; h <= a_mpItemList.count; ++h) {
  if (lingoBinary("or", lingoBinary("eq", a_mpItemList[h].id, a_iLand), (lingoTruthy(callNamed("voidp", a_sSpecialCategory)) ? 0 : 1))) {
  setThePropOf(a_mpItemList[h], "state", 1);
  if (lingoBinary("and", (lingoTruthy(callNamed("voidp", meProp(_me, "m_iDefinedSubPageToShow"))) ? 0 : 1), (lingoTruthy(callNamed("voidp", meProp(_me, "m_iDefinedPageToShow"))) ? 0 : 1))) {
  setThePropOf(a_mpItemList[h], "state", 0);
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 16, new LingoPropList([symbol("int"), meProp(_me, "m_iDefinedSubPageToShow")]))
  t_bFoundSomething = 1;
  } else {
  for (var s = 4; s <= a_mpItemList[h].count; ++s) {
  var t_sPropName = callMethod("getPropAt", a_mpItemList[h], s);
  if (callNamed("voidp", meProp(_me, "m_sSpecialCategory"))) {
  if (lingoBinary("contains", t_sPropName, meProp(_me, "m_sActiveCategory"))) {
  setMeProp(_me, "m_iDefinedPageToShow", a_iLand);
  setMeProp(_me, "m_iDefinedSubPageToShow", a_mpItemList[h][s].id);
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 16, new LingoPropList([symbol("int"), meProp(_me, "m_iDefinedSubPageToShow")]))
  t_bFoundSomething = 1;
  }

  continue;
  }

  setThePropOf(a_mpItemList[h], "state", 0);
  if (lingoBinary("eq", t_sPropName, a_sSpecialCategory)) {
  setThePropOf(a_mpItemList[h], "state", 1);
  setMeProp(_me, "m_iDefinedPageToShow", a_iLand);
  setMeProp(_me, "m_iDefinedSubPageToShow", a_mpItemList[h][s].id);
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 16, new LingoPropList([symbol("int"), meProp(_me, "m_iDefinedSubPageToShow")]))
  t_bFoundSomething = 1;
  }

  }

  }

  continue;
  }

  setThePropOf(a_mpItemList[h], "state", 0);
  }

  if ((lingoTruthy(t_bFoundSomething) ? 0 : 1)) {
  meProp(_me, "m_mpCatalogData")["category"] = new LingoPropList(["", new LingoPropList([])]);
  callMethod("ShowThumbs", _this, new LingoPropList([]))
  }

}

