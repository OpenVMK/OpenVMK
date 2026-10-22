// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogInterface / showDefinedCatalogPage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showDefinedCatalogPage(_me: LingoMe, _this: LingoValue, a_iPageToShow: LingoValue, a_iSubpage: LingoValue) {
  setMeProp(_me, "m_iPageToShow", a_iPageToShow);
  setMeProp(_me, "m_SubpageToShow", a_iSubpage);
  if (callNamed("voidp", meProp(_me, "m_rWindow"))) {
  callMethod("OpenCloseCatalog", _this)
  } else {
  callMethod("CloseCatalog", _this)
  callMethod("OpenCloseCatalog", _this)
  }

}

