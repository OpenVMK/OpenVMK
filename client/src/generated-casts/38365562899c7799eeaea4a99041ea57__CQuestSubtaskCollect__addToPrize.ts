// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskCollect / addToPrize

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addToPrize(_me: LingoMe) {
  if (lingoBinary("lte", lingoBinary("add", meProp(_me, "m_iCurrentScore"), meProp(_me, "m_ar_defaults")[symbol("accuracy")]), meProp(_me, "m_ar_defaults")[symbol("max")])) {
  callMethod("setAmount", _me, lingoBinary("add", meProp(_me, "m_iCurrentScore"), meProp(_me, "m_ar_defaults")[symbol("accuracy")]))
  } else {
  callMethod("setAmount", _me, meProp(_me, "m_ar_defaults")[symbol("max")])
  }

}

