// vmk_fireworks_minigame.cct / CFireworksGameComponent / AddHit

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AddHit(_me: LingoMe, i_iAccuracy: LingoValue, i_bSelection: LingoValue, i_iType: LingoValue, i_iId: LingoValue, a_iHitType: LingoValue, i_iSelectedType: LingoValue) {
  var tScore = i_iAccuracy;
  if ((lingoTruthy(i_bSelection) ? 0 : 1)) {
  tScore = lingoBinary("div", tScore, 4);
  }

  setMeProp(_me, "m_iScore", lingoBinary("add", meProp(_me, "m_iScore"), tScore));
  callMethod("append", meProp(_me, "m_ar_hitList"), new LingoPropList([symbol("accuracy"), i_iAccuracy, symbol("selected"), i_bSelection, symbol("type"), i_iType, symbol("id"), i_iId, symbol("hit"), a_iHitType, symbol("selectedType"), i_iSelectedType]))
  if (lingoBinary("eq", a_iHitType, 5)) {
  setMeProp(_me, "m_iBonus", lingoBinary("add", meProp(_me, "m_iBonus"), 0.5));
  if (lingoBinary("gt", meProp(_me, "m_iBonus"), 3)) {
  setMeProp(_me, "m_iBonus", float(3));
  }

  } else {
  setMeProp(_me, "m_iBonus", float(1));
  }

  if (i_bSelection) {
  callMethod("CheckBonusCombination", _me, i_iType)
  } else {
  setMeProp(_me, "m_ar_currentCombination", new LingoList([]));
  }

}

