// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoInterface / SaveOriginalData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SaveOriginalData(_me: LingoMe, a_sName: LingoValue, a_sDesc: LingoValue) {
  setMeProp(_me, "m_sRoomNameOld", a_sName);
  setMeProp(_me, "m_sRoomDescOld", a_sDesc);
}

