// 2230483a2e5366aa24e52c1b02d9674c.cct / CCannedTextNew / TransformCannedMsgToString

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TransformCannedMsgToString(_me: LingoMe, a_rMsg: LingoValue) {
  callNamed("trace", lingoBinary("joinPad", "TransformCannedMsg()", a_rMsg))
  return callMethod("TransformCannedMsgToString", callMethod("getComponent", callNamed("getThread", "dictionary")), a_rMsg);
}

