// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerComponent / removeFriend

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removeFriend(_me: LingoMe, a_iTargetID: LingoValue) {
  var t_ar_search = new LingoPropList([symbol("index"), -float(1), symbol("entry"), undefined]);
  if (callMethod("findAddressbookEntry", _me, a_iTargetID, t_ar_search)) {
  callMethod("removeAddressbookEntry", callMethod("getInterface", _me), t_ar_search.entry)
  callMethod("removeMessagesByFriend", _me, a_iTargetID)
  callMethod("deleteAt", meProp(_me, "m_ar_addressbook"), t_ar_search.index)
  }

  callMethod("updateCurrentView", callMethod("getInterface", _me))
}

