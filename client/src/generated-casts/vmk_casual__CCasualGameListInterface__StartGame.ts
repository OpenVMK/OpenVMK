// vmk_casual.cct / CCasualGameListInterface / StartGame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StartGame(_me: LingoMe, _this: LingoValue) {
  callMethod("send", callNamed("getConnection", "VMK"), 952, new LingoPropList([symbol("integer"), meProp(_me, "m_iGameCode")]))
}

