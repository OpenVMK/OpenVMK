// core.old.cct / CConnection / GetByteFrom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetByteFrom(_me: LingoMe) {
  var tStream = callMethod("getaProp", meProp(_me, "pMsgStruct"), symbol("content"));
  var tByte = callNamed("bitAnd", callNamed("charToNum", chunkOf(tStream, "char", 1, 0)), 63);
  callMethod("setaProp", meProp(_me, "pMsgStruct"), symbol("content"), tStream.char.range(2, callNamed("length", tStream)))
  return tByte;
}

