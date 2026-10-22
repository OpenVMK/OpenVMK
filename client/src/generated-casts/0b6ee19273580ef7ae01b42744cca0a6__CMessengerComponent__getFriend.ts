// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerComponent / getFriend

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getFriend(_me: LingoMe, a_sName: LingoValue) {
  var t_bfound = 0;
  for (var t_rEntry of meProp(_me, "m_ar_addressbook").toArray()) {
  var t_sName = t_rEntry.buddyname;
  var t_gen1 = lingoBinary("join", t_sName, "s");
  var t_gen2 = lingoBinary("join", t_sName, "'s");
  if (lingoBinary("eq", a_sName, t_sName)) {
  t_bfound = 1;
  } else {
  if (lingoBinary("eq", a_sName, t_gen1)) {
  t_bfound = 1;
  } else {
  if (lingoBinary("eq", a_sName, t_gen2)) {
  t_bfound = 1;
  }

  }

  }

  if (t_bfound) {
  var t_rFriend = callMethod("duplicate", t_rEntry);
  t_rFriend[symbol("name")] = t_rFriend[symbol("buddyname")];
  t_rFriend[symbol("id")] = t_rFriend[symbol("userID")];
  return t_rFriend;
  }

  }

  return undefined;
}

