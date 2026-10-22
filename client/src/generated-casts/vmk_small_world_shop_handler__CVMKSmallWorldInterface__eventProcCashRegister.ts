// vmk_small_world_shop_handler.cct / CVMKSmallWorldInterface / eventProcCashRegister

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcCashRegister(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  if (theProperty("doubleClick")) {
  callNamed("put", lingoBinary("joinPad", "Clicked", new LingoList([tEvent, tElemID, tParm])))
  callMethod("cashRegisterClicked", callMethod("getHandler", _me))
  }

  }

}

