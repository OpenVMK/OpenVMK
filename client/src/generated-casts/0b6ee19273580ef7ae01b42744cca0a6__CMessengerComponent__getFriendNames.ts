// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerComponent / getFriendNames

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getFriendNames(_me: LingoMe) {
  var t_ar_friends = new LingoList([]);
  for (var t_ar_entry of meProp(_me, "m_ar_addressbook").toArray()) {
  callMethod("append", t_ar_friends, t_ar_entry.buddyname)
  }

  return t_ar_friends;
}

