// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoHandler / MonorailEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function MonorailEvent(_me: LingoMe, a_rMsg: LingoValue) {
  callNamed("executeMessage", symbol("MonorailStatus"), callMethod("GetIntFrom", a_rMsg.connection))
  setMeProp(_me, "m_iMonorailStatus", callMethod("GetIntFrom", a_rMsg.connection));
}

