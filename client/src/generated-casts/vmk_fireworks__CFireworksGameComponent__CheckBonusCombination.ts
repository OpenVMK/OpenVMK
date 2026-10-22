// vmk_fireworks.cct / CFireworksGameComponent / CheckBonusCombination

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CheckBonusCombination(_me: LingoMe, a_iType: LingoValue) {
  var t_ar_combination = callMethod("GetBonusCombination", meProp(_me, "m_stage"));
  if (lingoBinary("eq", t_ar_combination.count, meProp(_me, "m_ar_currentCombination").count)) {
  setMeProp(_me, "m_ar_currentCombination", new LingoList([]));
  }

  var t_iCheckIndex = lingoBinary("add", meProp(_me, "m_ar_currentCombination").count, 1);
  if (lingoBinary("lte", t_iCheckIndex, t_ar_combination.count)) {
  if (lingoBinary("eq", t_ar_combination[t_iCheckIndex], a_iType)) {
  callMethod("append", meProp(_me, "m_ar_currentCombination"), a_iType)
  if (lingoBinary("eq", t_ar_combination.count, meProp(_me, "m_ar_currentCombination").count)) {
  }

  } else {
  setMeProp(_me, "m_ar_currentCombination", new LingoList([]));
  t_iCheckIndex = 1;
  if (lingoBinary("eq", t_ar_combination[t_iCheckIndex], a_iType)) {
  callMethod("append", meProp(_me, "m_ar_currentCombination"), a_iType)
  }

  }

  } else {
  setMeProp(_me, "m_ar_currentCombination", new LingoList([]));
  }

}

