// c7d81c175a2637e0193f0cf7bfd014ba.cct / CRoomItemGift / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  if (callNamed("objectExists", "GiftHandler")) {
  setMeProp(_me, "m_obj_GiftHandler", callNamed("getObject", "GiftHandler"));
  } else {
  setMeProp(_me, "m_obj_GiftHandler", callNamed("createObject", "GiftHandler", "CRoomItemGiftHandler"));
  }

}

