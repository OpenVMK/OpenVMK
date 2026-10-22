// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoComponent / Activate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Activate(_me: LingoMe) {
  setMeProp(_me, "m_active", 1);
  setMeProp(_me, "m_arRoomInstanceTitles", callMethod("getRoomInstanceTitles", callMethod("getInterface", callNamed("getThread", "navigator"))));
}

