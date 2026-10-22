// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoInterface / updateOwnRoomInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateOwnRoomInfo(_me: LingoMe) {
  var tConnection = callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK"));
  if (lingoBinary("neq", tConnection, 0)) {
  callMethod("send", tConnection, 24)
  }

}

