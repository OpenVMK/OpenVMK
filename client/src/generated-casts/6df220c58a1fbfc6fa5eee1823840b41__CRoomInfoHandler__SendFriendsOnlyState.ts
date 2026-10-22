// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoHandler / SendFriendsOnlyState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SendFriendsOnlyState(_me: LingoMe, a_iState: LingoValue) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 598, new LingoPropList([symbol("integer"), a_iState]))
}

