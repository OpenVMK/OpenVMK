// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerComponent / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  setMeProp(_me, "m_ar_inbox", new LingoList([]));
  setMeProp(_me, "m_ar_addressbook", new LingoList([]));
  setMeProp(_me, "m_ar_Requests", new LingoList([]));
  setMeProp(_me, "m_ar_avatars", new LingoList([]));
  setMeProp(_me, "m_bInboxUpdated", 0);
  setMeProp(_me, "m_bAddressbookUpdated", 0);
  setMeProp(_me, "m_bRequestsUpdated", 0);
  setMeProp(_me, "m_rRecipient", undefined);
  return 1;
}

