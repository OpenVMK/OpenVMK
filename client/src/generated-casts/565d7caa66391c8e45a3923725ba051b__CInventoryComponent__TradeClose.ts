// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryComponent / TradeClose

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TradeClose(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rTradeDevice"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rTradeDevice")))
  setMeProp(_me, "m_rTradeDevice", undefined);
  }

  var m_mp_ItemData = new LingoPropList([symbol("itemInventory"), new LingoPropList([]), symbol("wornPins"), new LingoPropList([]), symbol("worn_clothes"), new LingoPropList([]), symbol("vmks"), new LingoPropList([])]);
  if (callNamed("objectExists", "TradeConfirm")) {
  callNamed("removeObject", "TradeConfirm")
  }

  var m_mp_TicketInfo = new LingoPropList([]);
}

