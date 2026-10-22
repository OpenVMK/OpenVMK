// core.old.cct / CConnectionDebug / GetBoolFrom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetBoolFrom(_me: LingoMe) {
  var tByteStr = callMethod("getaProp", meProp(_me, "pMsgStruct"), symbol("content"));
  var tByte = callNamed("bitAnd", callNamed("charToNum", chunkOf(tByteStr, "char", 1, 0)), 63);
  callMethod("setaProp", meProp(_me, "pMsgStruct"), symbol("content"), tByteStr.char.range(2, callNamed("length", tByteStr)))
  m_sDebugInput = m_sDebugInput + lingoBinary("join", lingoBinary("joinPad", "BOOL:", lingoBinary("neq", tByte, 0)), "\r");
  return lingoBinary("neq", tByte, 0);
}

