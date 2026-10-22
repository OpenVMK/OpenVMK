// d0e535313898676eb605277339b50f27.cct / CHiddenMickeyStatus / updateMickeyList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateMickeyList(_me: LingoMe, i_ar_FoundMickeys: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_pMickeyList"))) ? 0 : 1)) {
  callMethod("createTopics", meProp(_me, "m_pMickeyList"), i_ar_FoundMickeys)
  callMethod("DrawHMDetailsList", _me)
  }

}

