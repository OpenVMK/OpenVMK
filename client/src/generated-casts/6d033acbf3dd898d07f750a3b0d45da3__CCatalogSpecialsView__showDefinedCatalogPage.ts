// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogSpecialsView / showDefinedCatalogPage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showDefinedCatalogPage(_me: LingoMe, _this: LingoValue, a_ar_CatData: LingoValue) {
  var t_iCatId = a_ar_CatData[1];
  var t_iSubCatId = a_ar_CatData[2];
  setMeProp(_me, "m_iDefinedPageToShow", t_iCatId);
  setMeProp(_me, "m_iDefinedSubPageToShow", t_iSubCatId);
}

