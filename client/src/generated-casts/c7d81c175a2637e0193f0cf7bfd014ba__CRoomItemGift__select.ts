// c7d81c175a2637e0193f0cf7bfd014ba.cct / CRoomItemGift / select

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function select(_me: LingoMe, _this: LingoValue) {
  if (theProperty("doubleClick")) {
  var t_iRef = callNamed("integer", callMethod("GetParam", callMethod("getObject", _this), "REF"));
  callMethod("send", callNamed("getConnection", "VMK"), "UseItem", new LingoPropList([symbol("int"), t_iRef, symbol("int"), 0]))
  if (callNamed("objectp", meProp(_me, "m_obj_GiftHandler"))) {
  callMethod("SetGiftItem", meProp(_me, "m_obj_GiftHandler"), t_iRef, _this)
  }

  }

}

