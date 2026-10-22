// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogInterface / CatalogIndexReceived

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CatalogIndexReceived(_me: LingoMe, _this: LingoValue, a_mpCatalogIndex: LingoValue) {
  if (callNamed("listp", a_mpCatalogIndex)) {
  if (lingoBinary("and", (lingoTruthy(callNamed("voidp", meProp(_me, "m_iPageToShow"))) ? 0 : 1), (lingoTruthy(callNamed("voidp", meProp(_me, "m_SubpageToShow"))) ? 0 : 1))) {
  if (lingoBinary("eq", meProp(_me, "m_SubpageToShow"), -float(1))) {
  callMethod("update", meProp(_me, "m_rCurPageObj"), a_mpCatalogIndex, "index", symbol("specials"))
  } else {
  callMethod("update", meProp(_me, "m_rCurPageObj"), new LingoList([meProp(_me, "m_iPageToShow"), meProp(_me, "m_SubpageToShow")]), "PageToShow", undefined, a_mpCatalogIndex)
  setMeProp(_me, "m_iPageToShow", undefined);
  }

  } else {
  callMethod("update", meProp(_me, "m_rCurPageObj"), a_mpCatalogIndex, "index")
  }

  setMeProp(_me, "m_rWindow", callMethod("GetWindowObj", meProp(_me, "m_rCurPageObj")));
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "RequestBalance")
  }

}

