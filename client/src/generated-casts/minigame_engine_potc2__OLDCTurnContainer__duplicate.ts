// minigame_engine_potc2.cct / OLDCTurnContainer / duplicate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function duplicate(_me: LingoMe) {
  return callNamed("new", callNamed("script", "CTurnContainer"), meProp(_me, "m_ar_subturns"), meProp(_me, "m_iNumber"), meProp(_me, "m_iChecksum"));
}

