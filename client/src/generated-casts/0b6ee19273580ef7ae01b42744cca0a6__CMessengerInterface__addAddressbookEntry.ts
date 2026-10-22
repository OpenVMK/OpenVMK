// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerInterface / addAddressbookEntry

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addAddressbookEntry(_me: LingoMe, a_ar_entry: LingoValue) {
  if ((lingoTruthy(callNamed("objectp", meProp(_me, "m_rAddressbookList"))) ? 0 : 1)) {
  callMethod("CreateAddressbookList", _me)
  }

  var t_rComponent = callMethod("addComponent", meProp(_me, "m_rAddressbookList"), "component.addressbook.xml");
  callMethod("setNode", callMethod("GetLayout", t_rComponent, 1), a_ar_entry)
  callMethod("updateAddressbookEntry", _me, a_ar_entry)
}

