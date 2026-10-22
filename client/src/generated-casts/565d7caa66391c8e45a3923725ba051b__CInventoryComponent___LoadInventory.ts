// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryComponent / _LoadInventory

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _LoadInventory(_me: LingoMe, _this: LingoValue) {
  if ((lingoTruthy(meProp(_me, "m_bInventoryRequested")) ? 0 : 1)) {
  callMethod("_RequestItemList", _this)
  setMeProp(_me, "m_bInventoryRequested", 1);
  }

}

