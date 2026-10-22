// core.old.cct / CMgrBroker / unregister

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function unregister(_me: LingoMe, tMessage: LingoValue, tClientID: LingoValue) {
  if (lingoBinary("and", !lingoTruthy(callNamed("symbolp", tMessage)), !lingoTruthy(callNamed("stringp", tMessage)))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Symbol or string expected:", tMessage), symbol("unregister"));
  }

  var tList = _me.pItemList[tMessage];
  if (callNamed("voidp", tList)) {
  return 0;
  }

  callMethod("deleteProp", tList, tClientID)
  if (lingoBinary("eq", tList.count, 0)) {
  callMethod("Remove", _me, tMessage)
  }

  return 1;
}

