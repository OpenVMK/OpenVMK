// core.old.cct / Special Services Class / print

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function print(_me: LingoMe, tObj: LingoValue, tMsg: LingoValue) {
  tObj = callNamed("string", tObj);
  tObj = tObj.word.range(2, lingoBinary("sub", tObj.word.count, 2));
  tObj = tObj.char.range(2, callNamed("length", tObj));
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", "Print:", "\r"), "\t"), "Object: "), tObj), "\r"), "\t"), "Message:"), tMsg))
}

