// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogInterface / CloseCatalog

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CloseCatalog(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rCurPageObj"))) {
  callMethod("CloseCatalog", meProp(_me, "m_rCurPageObj"))
  setMeProp(_me, "m_rWindow", undefined);
  setMeProp(_me, "m_iPageToShow", undefined);
  setMeProp(_me, "m_SubpageToShow", undefined);
  }

}

