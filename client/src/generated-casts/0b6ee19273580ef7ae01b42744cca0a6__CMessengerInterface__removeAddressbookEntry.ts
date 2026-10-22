// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerInterface / removeAddressbookEntry

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removeAddressbookEntry(_me: LingoMe, a_ar_entry: LingoValue) {
  if ((lingoTruthy(callNamed("objectp", meProp(_me, "m_rAddressbookList"))) ? 0 : 1)) {
  callMethod("CreateAddressbookList", _me)
  }

  for (var t_rEntry of callMethod("GetComponents", meProp(_me, "m_rAddressbookList")).toArray()) {
  if (lingoBinary("eq", callMethod("GetNode", callMethod("GetLayout", t_rEntry, 1)), a_ar_entry)) {
  callMethod("deleteComponent", meProp(_me, "m_rAddressbookList"), t_rEntry)
  return 1;
  }

  }

  return 0;
}

