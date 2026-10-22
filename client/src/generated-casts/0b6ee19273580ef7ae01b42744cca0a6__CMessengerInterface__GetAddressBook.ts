// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerInterface / GetAddressBook

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetAddressBook(_me: LingoMe) {
  if ((lingoTruthy(callNamed("objectp", meProp(_me, "m_rAddressbookList"))) ? 0 : 1)) {
  callMethod("CreateAddressbookList", _me)
  }

  return meProp(_me, "m_rAddressbookList");
}

