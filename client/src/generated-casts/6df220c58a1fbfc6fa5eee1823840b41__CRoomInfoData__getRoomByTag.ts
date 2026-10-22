// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoData / getRoomByTag

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getRoomByTag(_me: LingoMe, roomTag: LingoValue) {
  var t_pInfo = new LingoPropList([]);
  t_pInfo[symbol("name")] = callNamed("getText", lingoBinary("join", lingoBinary("join", "ROOM.", roomTag), ".NAME"));
  t_pInfo[symbol("description")] = callNamed("getText", lingoBinary("join", lingoBinary("join", "ROOM.", roomTag), ".DESC"));
  return t_pInfo;
}

