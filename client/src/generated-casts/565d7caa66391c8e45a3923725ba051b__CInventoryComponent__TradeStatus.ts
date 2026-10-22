// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryComponent / TradeStatus

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TradeStatus(_me: LingoMe, _this: LingoValue, a_rOwnSet: LingoValue, a_rHerSet: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rTradeDevice"))) {
  callMethod("status", meProp(_me, "m_rTradeDevice"), a_rOwnSet, a_rHerSet)
  } else {
  callNamed("error", _this, "Trade device not found!", symbol("TradeStatus"))
  }

}

