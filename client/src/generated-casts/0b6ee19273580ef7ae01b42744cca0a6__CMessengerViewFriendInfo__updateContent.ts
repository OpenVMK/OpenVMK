// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerViewFriendInfo / updateContent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateContent(_me: LingoMe) {
  setMeProp(_me, "m_ar_Requests", callMethod("GetRequests", callMethod("getComponent", _me)));
  var t_rImg = callMethod("render", meProp(_me, "m_rAddressbookList"));
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "mes.friendslist"), t_rImg)
  callMethod("showAddressBookEntryInfo", _me)
  callMethod("updateRequestField", _me)
}

