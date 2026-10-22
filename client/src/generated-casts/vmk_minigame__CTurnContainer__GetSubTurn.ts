// vmk_minigame.cct / CTurnContainer / GetSubTurn

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetSubTurn(_me: LingoMe, i_iSubturn: LingoValue) {
  if (lingoBinary("or", lingoBinary("gt", i_iSubturn, meProp(_me, "m_ar_subturns").count), lingoBinary("lt", i_iSubturn, 1))) {
  callNamed("put", lingoBinary("join", lingoBinary("join", "MGEngine : Requested subturn ", i_iSubturn), " that does not exist"))
  return new LingoList([]);
  }

  return meProp(_me, "m_ar_subturns")[i_iSubturn];
}

