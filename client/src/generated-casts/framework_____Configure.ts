// framework.dcr /  / _Configure

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _Configure(_me: LingoMe, date: LingoValue, removeWindow: LingoValue, TradeCancelled: LingoValue, getWindow: LingoValue) {
  if (lingoBinary("eq", removeWindow, "trade.dialog.oppositeGender")) {
  if (lingoBinary("eq", TradeCancelled, symbol("t_rTrader"))) {
  callMethod("t_iTraderGender", date.magiword, getWindow, 1)
  }

  } else {
  if (lingoBinary("eq", TradeCancelled, "ItemsDeletedFromHk")) {
  }

  }

  callNamed("point", lingoBinary("join", "Unknown Dialog Window", removeWindow))
}

