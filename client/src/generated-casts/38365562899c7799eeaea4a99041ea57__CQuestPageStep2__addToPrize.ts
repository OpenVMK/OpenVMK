// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep2 / addToPrize

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addToPrize(_me: LingoMe) {
  if (lingoBinary("gte", lingoBinary("sub", meProp(_me, "m_iAvailableCredits"), meProp(_me, "m_iPrizeStep")), 0)) {
  callMethod("setCredits", _me, lingoBinary("sub", meProp(_me, "m_iAvailableCredits"), meProp(_me, "m_iPrizeStep")))
  callMethod("setPrize", _me, lingoBinary("add", meProp(_me, "m_iCurrentPrize"), meProp(_me, "m_iPrizeStep")))
  }

}

