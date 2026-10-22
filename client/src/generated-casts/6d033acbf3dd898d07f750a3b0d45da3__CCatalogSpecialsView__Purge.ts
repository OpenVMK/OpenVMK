// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogSpecialsView / Purge

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Purge(_me: LingoMe, _this: LingoValue, a_rWindow: LingoValue) {
  setMeProp(_me, "m_iDefinedPageToShow", undefined);
  setMeProp(_me, "m_iDefinedSubPageToShow", undefined);
  callMethod("SetBufferElement", meProp(_me, "m_rGridLoadAnim"), undefined)
  callNamed("removeUpdate", callMethod("getID", meProp(_me, "m_rGridLoadAnim")))
  if (callNamed("objectp", meProp(_me, "m_rWndObj"))) {
  setMeProp(_me, "m_rWndObj", undefined);
  return callMethod("unmerge", a_rWindow);
  } else {
  return 1;
  }

}

