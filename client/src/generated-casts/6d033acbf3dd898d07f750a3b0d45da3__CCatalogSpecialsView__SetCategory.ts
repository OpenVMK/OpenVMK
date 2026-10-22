// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogSpecialsView / SetCategory

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetCategory(_me: LingoMe, _this: LingoValue, a_sTab: LingoValue) {
  setMeProp(_me, "m_sActiveCategory", a_sTab);
  setMeProp(_me, "m_sSelectedTab", a_sTab);
}

