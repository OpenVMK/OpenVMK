// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerViewFriendInfo / merge

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function merge(_me: LingoMe, a_rWindow: LingoValue) {
  setMeProp(_me, "m_rWindow", a_rWindow);
  callMethod("merge", meProp(_me, "m_rWindow"), "vmk_mes_friendsinfo.window")
  setMeProp(_me, "m_rAddressbookList", callMethod("GetAddressBook", callMethod("getInterface", _me)));
  callNamed("put", callMethod("GetActive", meProp(_me, "m_rAddressbookList")))
  if (callNamed("objectp", callMethod("GetActive", meProp(_me, "m_rAddressbookList")))) {
  callMethod("updateContent", _me)
  } else {
  callMethod("changeView", callMethod("getInterface", _me), "friendlist")
  }

}

