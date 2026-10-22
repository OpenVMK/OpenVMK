// c7d81c175a2637e0193f0cf7bfd014ba.cct / CRoomItemGiftHandler / SetGiftItem

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetGiftItem(_me: LingoMe, a_iRef: LingoValue, a_obj: LingoValue) {
  if (lingoBinary("eq", callMethod("findPos", meProp(_me, "m_mp_GiftObjects"), callNamed("string", a_iRef)), 0)) {
  callMethod("addProp", meProp(_me, "m_mp_GiftObjects"), a_iRef, a_obj)
  } else {
  meProp(_me, "m_mp_GiftObjects")[callNamed("string", a_iRef)] = a_obj;
  }

}

