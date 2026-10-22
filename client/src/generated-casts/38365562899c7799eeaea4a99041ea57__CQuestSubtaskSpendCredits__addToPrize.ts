// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskSpendCredits / addToPrize

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addToPrize(_me: LingoMe) {
  callMethod("setAmount", _me, lingoBinary("add", meProp(_me, "m_iCurrentAmount"), meProp(_me, "m_iPrizeStep")))
}

