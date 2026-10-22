// core.old.cct / CMgrBroker / register

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function register(_me: LingoMe, tMessage: LingoValue, tClientID: LingoValue, tMethod: LingoValue) {
  if (lingoBinary("and", !lingoTruthy(callNamed("symbolp", tMessage)), !lingoTruthy(callNamed("stringp", tMessage)))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Symbol or string expected:", tMessage), symbol("register"));
  }

  if (!lingoTruthy(callNamed("objectExists", tClientID))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Object not found:", tClientID), symbol("register"));
  }

  if (callNamed("voidp", _me.pItemList[tMessage])) {
  _me.pItemList[tMessage] = new LingoPropList([]);
  }

  _me.pItemList[tMessage][tClientID] = tMethod;
  return 1;
}

