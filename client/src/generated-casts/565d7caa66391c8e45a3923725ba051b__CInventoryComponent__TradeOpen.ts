// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryComponent / TradeOpen

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TradeOpen(_me: LingoMe, _this: LingoValue, a_iTraderRef: LingoValue, i_bOppositeGender: LingoValue) {
  if (callNamed("voidp", meProp(_me, "m_rTradeDevice"))) {
  setMeProp(_me, "m_rTradeDevice", callNamed("createObject", callNamed("getUniqueID"), "CInvTrade"));
  callMethod("SetPartner", meProp(_me, "m_rTradeDevice"), a_iTraderRef, i_bOppositeGender)
  }

}

