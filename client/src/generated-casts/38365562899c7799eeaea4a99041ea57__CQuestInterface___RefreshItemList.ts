// 38365562899c7799eeaea4a99041ea57.cct / CQuestInterface / _RefreshItemList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _RefreshItemList(_me: LingoMe, a_mp_kType_mp_iRef_rItem: LingoValue, a_kAlteredCategory: LingoValue) {
  if ((lingoTruthy(meProp(_me, "m_bInitialized")) ? 0 : 1)) {
  callMethod("_InitPageBase", _me)
  }

  if (meProp(_me, "m_bInitialized")) {
  callMethod("update", meProp(_me, "m_rPageBase"), a_mp_kType_mp_iRef_rItem, a_kAlteredCategory)
  }

  return 1;
}

