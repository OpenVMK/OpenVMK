// vmk_furniture_code.cct / CRoomItemGift / OpenFromInventory

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OpenFromInventory(_me: LingoMe, _this: LingoValue, a_iRef: LingoValue) {
  callMethod("send", callNamed("getConnection", "VMK"), "ReadGiftMessage", new LingoPropList([symbol("int"), 1, symbol("int"), a_iRef]))
  if (callNamed("objectp", meProp(_me, "m_obj_GiftHandler"))) {
  callMethod("SetModal", meProp(_me, "m_obj_GiftHandler"), 1)
  callMethod("SetGiftItem", meProp(_me, "m_obj_GiftHandler"), a_iRef, _this)
  }

}

