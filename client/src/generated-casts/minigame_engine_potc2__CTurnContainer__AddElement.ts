// minigame_engine_potc2.cct / CTurnContainer / AddElement

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AddElement(_me: LingoMe, i_iSubturn: LingoValue, i_rElement: LingoValue) {
  if (lingoBinary("lt", meProp(_me, "m_ar_subturns").count, i_iSubturn)) {
  for (var i = lingoBinary("add", meProp(_me, "m_ar_subturns").count, 1); i <= i_iSubturn; ++i) {
  callMethod("append", meProp(_me, "m_ar_subturns"), new LingoList([]))
  }

  }

  if ((lingoTruthy(callNamed("voidp", i_rElement)) ? 0 : 1)) {
  callMethod("append", meProp(_me, "m_ar_subturns")[i_iSubturn], i_rElement)
  }

}

