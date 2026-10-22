// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerInterface / updateAddressbookEntry

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateAddressbookEntry(_me: LingoMe, a_ar_entry: LingoValue) {
  if ((lingoTruthy(callNamed("objectp", meProp(_me, "m_rAddressbookList"))) ? 0 : 1)) {
  callMethod("CreateAddressbookList", _me)
  }

  for (var t_rEntry of callMethod("GetComponents", meProp(_me, "m_rAddressbookList")).toArray()) {
  if (lingoBinary("eq", callMethod("GetNode", callMethod("GetLayout", t_rEntry, 1)), a_ar_entry)) {
  if (a_ar_entry.online) {
  callMethod("setColor", callMethod("GetLayout", t_rEntry, 1), callNamed("rgb", "#00D524"))
  callMethod("setText", callMethod("GetLayout", t_rEntry, 1), lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", a_ar_entry.buddyname, "("), a_ar_entry.usersRoom), ")"))
  } else {
  callMethod("setColor", callMethod("GetLayout", t_rEntry, 1), callNamed("rgb", "#275692"))
  callMethod("setText", callMethod("GetLayout", t_rEntry, 1), a_ar_entry.buddyname)
  }

  callMethod("setSortKey", callMethod("GetLayout", t_rEntry, 1), lingoBinary("join", lingoBinary("sub", 2, a_ar_entry.online), a_ar_entry.buddyname))
  callMethod("requireSorting", meProp(_me, "m_rAddressbookList"))
  return 1;
  }

  }

  return 0;
}

