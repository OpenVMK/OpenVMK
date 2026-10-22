// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerComponent / findAddressbookEntry

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function findAddressbookEntry(_me: LingoMe, a_iEntryId: LingoValue, a_ar_out: LingoValue) {
  for (var i = 1; i <= meProp(_me, "m_ar_addressbook").count; ++i) {
  if (lingoBinary("eq", meProp(_me, "m_ar_addressbook")[i].userID, a_iEntryId)) {
  a_ar_out[symbol("index")] = i;
  a_ar_out[symbol("entry")] = meProp(_me, "m_ar_addressbook")[i];
  return 1;
  }

  }

  return 0;
}

