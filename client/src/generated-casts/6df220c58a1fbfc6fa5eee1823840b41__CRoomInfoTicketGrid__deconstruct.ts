// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoTicketGrid / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rRenderer")))
  setMeProp(_me, "m_rRenderer", undefined);
  setMeProp(_me, "m_rBufferImg", undefined);
  setMeProp(_me, "m_rImgElement", undefined);
  setMeProp(_me, "m_mp_iRef_rItem", undefined);
  setMeProp(_me, "m_rWindow", undefined);
  return 1;
}

