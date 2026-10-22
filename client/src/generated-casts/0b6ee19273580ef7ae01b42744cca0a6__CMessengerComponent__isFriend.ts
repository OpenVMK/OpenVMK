// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerComponent / isFriend

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function isFriend(_me: LingoMe, a_sName: LingoValue) {
  for (var t_ar_entry of meProp(_me, "m_ar_addressbook").toArray()) {
  if (lingoBinary("eq", t_ar_entry.buddyname, a_sName)) {
  return 1;
  }

  }

  return 0;
}

