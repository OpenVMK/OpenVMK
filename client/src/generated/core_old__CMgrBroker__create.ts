// core.old.cct / CMgrBroker / create

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function create(_me: LingoMe, tMessage: LingoValue) {
  if (lingoBinary("and", !lingoTruthy(callNamed("symbolp", tMessage)), !lingoTruthy(callNamed("stringp", tMessage)))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Symbol or string expected:", tMessage), symbol("create"));
  }

  if (!lingoTruthy(callNamed("voidp", _me.pItemList[tMessage]))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Broker task already exists:", tMessage), symbol("create"));
  }

  _me.pItemList[tMessage] = new LingoPropList([]);
  return 1;
}

