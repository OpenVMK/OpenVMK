// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryComponent / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rTradeDevice"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rTradeDevice")))
  setMeProp(_me, "m_rTradeDevice", undefined);
  }

  callNamed("unregisterMessage", "room_ready", callMethod("getID", _this))
  return 1;
}

