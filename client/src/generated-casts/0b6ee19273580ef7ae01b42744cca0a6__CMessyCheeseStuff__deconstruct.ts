// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessyCheeseStuff / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callMethod("regMsgList", _me, 0)
  callNamed("unregisterMessage", "init_messenger", callMethod("getID", _me))
}

