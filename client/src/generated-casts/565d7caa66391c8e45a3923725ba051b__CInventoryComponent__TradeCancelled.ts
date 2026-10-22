// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryComponent / TradeCancelled

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TradeCancelled(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rTradeDevice"))) {
  var t_mp_ItemsInTrade = callMethod("UpdateInventory", meProp(_me, "m_rTradeDevice"));
  callMethod("TradeClose", _this)
  } else {
  return 0;
  }

  if (callNamed("listp", t_mp_ItemsInTrade)) {
  for (var i = 1; i <= t_mp_ItemsInTrade.count; ++i) {
  var t_kType = callMethod("getPropAt", t_mp_ItemsInTrade, i);
  if (lingoBinary("gt", t_mp_ItemsInTrade[i].count, 0)) {
  for (var e = 1; e <= t_mp_ItemsInTrade[i].count; ++e) {
  var t_iRef = callMethod("getPropAt", t_mp_ItemsInTrade[i], e);
  var t_mpItem = t_mp_ItemsInTrade[i][e];
  if (lingoBinary("and", (lingoTruthy(callNamed("voidp", t_iRef)) ? 0 : 1), (lingoTruthy(callNamed("voidp", t_mpItem)) ? 0 : 1))) {
  }

  }

  }

  }

  }

}

