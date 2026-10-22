// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogInterface / _RefreshItemList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _RefreshItemList(_me: LingoMe, _this: LingoValue, a_mpItemList: LingoValue, a_kAlteredCategory: LingoValue) {
  if (lingoBinary("and", callNamed("objectp", meProp(_me, "m_rWindow")), lingoBinary("neq", a_kAlteredCategory, "balance"))) {
  callMethod("update", meProp(_me, "m_rCurPageObj"), a_mpItemList, a_kAlteredCategory)
  setMeProp(_me, "m_bDataReceived", 1);
  setMeProp(_me, "m_iPageToShow", undefined);
  setMeProp(_me, "m_SubpageToShow", undefined);
  } else {
  if (lingoBinary("and", callNamed("voidp", meProp(_me, "m_rWindow")), lingoBinary("eq", a_kAlteredCategory, "index"))) {
  callMethod("CatalogIndexReceived", _this, a_mpItemList)
  } else {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rWindow"))) ? 0 : 1)) {
  callMethod("update", meProp(_me, "m_rCurPageObj"), a_mpItemList, a_kAlteredCategory)
  }

  }

  }

}

