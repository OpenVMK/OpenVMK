// core.old.cct / CMgrBroker / Remove

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Remove(_me: LingoMe, tMessage: LingoValue) {
  if (lingoBinary("and", !lingoTruthy(callNamed("symbolp", tMessage)), !lingoTruthy(callNamed("stringp", tMessage)))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Symbol or string expected:", tMessage), symbol("Remove"));
  }

  if (callNamed("voidp", _me.pItemList[tMessage])) {
  return callNamed("error", _me, lingoBinary("joinPad", "Broker task not found:", tMessage), symbol("Remove"));
  }

  return callMethod("deleteProp", _me.pItemList, tMessage);
}

