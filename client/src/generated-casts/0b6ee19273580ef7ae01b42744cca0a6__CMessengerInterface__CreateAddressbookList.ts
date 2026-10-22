// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerInterface / CreateAddressbookList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateAddressbookList(_me: LingoMe) {
  setMeProp(_me, "m_rAddressbookList", callNamed("createObject", callNamed("getUniqueID"), "CUIComponentPage"));
  callMethod("setColor", meProp(_me, "m_rAddressbookList"), callNamed("rgb", "#001f55"))
  callMethod("setSize", meProp(_me, "m_rAddressbookList"), 267, 200)
  for (var t_ar_entry of callMethod("GetAddressBook", callMethod("getComponent", _me)).toArray()) {
  callMethod("addAddressbookEntry", _me, t_ar_entry)
  }

  callMethod("setSortingOrder", meProp(_me, "m_rAddressbookList"), symbol("key"))
}

