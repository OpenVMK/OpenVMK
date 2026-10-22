// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerViewMessagesNew / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callMethod("Purge", _me)
  callNamed("unregisterMessage", "DeleteMessages", callMethod("getID", _me))
  return 1;
}

