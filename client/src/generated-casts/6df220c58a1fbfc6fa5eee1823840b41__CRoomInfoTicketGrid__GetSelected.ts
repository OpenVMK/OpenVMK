// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoTicketGrid / GetSelected

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetSelected(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("lt", meProp(_me, "m_mp_iRef_rItem").count, meProp(_me, "m_iSelected"))) {
  return new LingoPropList([symbol("ref"), -float(1), symbol("code"), -float(1), symbol("param"), -float(1), symbol("state"), symbol("invalid"), symbol("price"), 0]);
  } else {
  return meProp(_me, "m_mp_iRef_rItem")[meProp(_me, "m_iSelected")];
  }

}

