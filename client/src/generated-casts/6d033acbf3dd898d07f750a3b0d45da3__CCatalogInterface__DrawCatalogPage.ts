// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogInterface / DrawCatalogPage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DrawCatalogPage(_me: LingoMe, _this: LingoValue, a_mpItemList: LingoValue) {
  callMethod("update", meProp(_me, "m_rCurPageObj"), a_mpItemList, "category")
}

