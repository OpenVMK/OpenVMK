// d0e535313898676eb605277339b50f27.cct / CHiddenMickeyStatus / DrawHMDetailsList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DrawHMDetailsList(_me: LingoMe) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_pMickeyList"))) ? 0 : 1)) {
  callMethod("render", meProp(_me, "m_pMickeyList"))
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sHiddenMickeyDetailWindowTitle"));
  if (lingoBinary("neq", tWndObj, 0)) {
  callMethod("feedImage", callMethod("getElement", tWndObj, "hm.details"), callMethod("getImage", meProp(_me, "m_pMickeyList")))
  }

  }

}

