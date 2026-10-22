// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerComponent / AddFriend

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AddFriend(_me: LingoMe, a_ar_friend: LingoValue) {
  callMethod("addAddressbookEntry", callMethod("getInterface", _me), a_ar_friend)
  callMethod("append", meProp(_me, "m_ar_addressbook"), a_ar_friend)
  callMethod("updateCurrentView", callMethod("getInterface", _me))
  callMethod("setIconPulse", callMethod("getInterface", _me), 1)
  callMethod("updateCannedFriendList", _me)
}

