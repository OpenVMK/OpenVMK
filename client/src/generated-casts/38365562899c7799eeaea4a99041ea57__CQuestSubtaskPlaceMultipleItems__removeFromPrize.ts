// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskPlaceMultipleItems / removeFromPrize

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removeFromPrize(_me: LingoMe) {
  if (lingoBinary("gte", lingoBinary("sub", meProp(_me, "m_iCurrentScore"), meProp(_me, "m_ar_defaults")[symbol("accuracy")]), meProp(_me, "m_ar_defaults")[symbol("min")])) {
  callMethod("setAmount", _me, lingoBinary("sub", meProp(_me, "m_iCurrentScore"), meProp(_me, "m_ar_defaults")[symbol("accuracy")]))
  } else {
  callMethod("setAmount", _me, meProp(_me, "m_ar_defaults")[symbol("min")])
  }

}

