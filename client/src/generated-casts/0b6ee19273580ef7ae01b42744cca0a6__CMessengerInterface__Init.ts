// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerInterface / Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Init(_me: LingoMe) {
  callMethod("CreateMessengerWindow", _me)
  if ((lingoTruthy(callNamed("objectp", meProp(_me, "m_rAddressbookList"))) ? 0 : 1)) {
  callMethod("CreateAddressbookList", _me)
  }

}

