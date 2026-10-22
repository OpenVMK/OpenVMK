// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessyCheeseStuff / InitMessengerOnce

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function InitMessengerOnce(_me: LingoMe) {
  callNamed("unregisterMessage", "init_messenger", callMethod("getID", _me))
  callMethod("MessengerInit", _me, new LingoList([]))
}

