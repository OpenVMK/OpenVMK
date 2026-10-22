// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogHandler / _ReceiveBalance

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ReceiveBalance(_me: LingoMe, a_rMsg: LingoValue) {
  callMethod("_UpdateProductList", callMethod("getComponent", _me), callMethod("GetIntFrom", a_rMsg.connection), "balance")
}

