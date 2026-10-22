// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerComponent / updateCannedFriendList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateCannedFriendList(_me: LingoMe) {
  var t_ar_friendnamelist = callNamed("GetCannedFriendWordList");
  for (var t_ar_friend of meProp(_me, "m_ar_addressbook").toArray()) {
  var t_sName = t_ar_friend[symbol("buddyname")];
  if (lingoBinary("eq", callMethod("getOne", t_ar_friendnamelist, t_sName), 0)) {
  callMethod("padNameForDictionary", _me, t_sName, t_ar_friendnamelist)
  }

  }

  callNamed("SetCannedFriendWordList", t_ar_friendnamelist)
}

