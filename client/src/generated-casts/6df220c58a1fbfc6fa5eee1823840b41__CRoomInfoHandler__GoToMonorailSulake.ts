// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoHandler / GoToMonorailSulake

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GoToMonorailSulake(_me: LingoMe) {
  callMethod("closeNavigator", _me)
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 31, new LingoPropList([symbol("integer"), 25, symbol("integer"), -float(1)]))
}

