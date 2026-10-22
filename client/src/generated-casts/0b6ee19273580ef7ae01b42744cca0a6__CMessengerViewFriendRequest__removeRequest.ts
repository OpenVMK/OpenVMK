// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerViewFriendRequest / removeRequest

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removeRequest(_me: LingoMe) {
  if (lingoBinary("gt", meProp(_me, "m_ar_Requests").count, 0)) {
  callMethod("deleteAt", meProp(_me, "m_ar_Requests"), 1)
  }

  if (lingoBinary("gt", meProp(_me, "m_ar_Requests").count, 0)) {
  callMethod("changeView", callMethod("getInterface", _me), "friendrequest")
  } else {
  callMethod("changeView", callMethod("getInterface", _me), "friendlist")
  }

}

