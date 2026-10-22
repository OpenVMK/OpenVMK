// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskEarnCredits / removeFromPrize

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removeFromPrize(_me: LingoMe) {
  if (lingoBinary("gte", lingoBinary("sub", meProp(_me, "m_iCurrentAmount"), meProp(_me, "m_iPrizeStep")), 0)) {
  callMethod("setAmount", _me, lingoBinary("sub", meProp(_me, "m_iCurrentAmount"), meProp(_me, "m_iPrizeStep")))
  } else {
  callMethod("setAmount", _me, 0)
  }

}

