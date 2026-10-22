// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogSpecialsView / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue, a_mpCatalogData: LingoValue, a_kAlteredCategory: LingoValue) {
  if (lingoBinary("eq", a_kAlteredCategory, "PageToShow")) {
  callMethod("showDefinedCatalogPage", _this, a_mpCatalogData)
  return 1;
  }

  setMeProp(_me, "m_mpCatalogData", a_mpCatalogData);
  switch (a_kAlteredCategory) {
case "index":
  callMethod("UpdateIndex", _this, a_mpCatalogData["index"])
  break;
case "category":
  callMethod("UpdatePreview", _this, a_mpCatalogData["category"])
  break;
case "balance":
  callMethod("UpdateBalance", _this)
  break;
case undefined:
  meProp(_me, "m_mpCatalogData")["category"] = new LingoPropList([1, new LingoPropList([])]);
  callMethod("UpdateIndex", _this, a_mpCatalogData["index"])
  callMethod("UpdateBalance", _this)
  break;
  }

}

