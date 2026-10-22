// core.old.cct / CConnectionDebug / GetIntFrom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetIntFrom(_me: LingoMe) {
  var tByteStr = callMethod("getaProp", meProp(_me, "pMsgStruct"), symbol("content"));
  var tByte = callNamed("bitAnd", callNamed("charToNum", chunkOf(tByteStr, "char", 1, 0)), 63);
  var tByCnt = callNamed("bitOr", lingoBinary("div", callNamed("bitAnd", tByte, 56), 8), 0);
  var tNeg = callNamed("bitAnd", tByte, 4);
  var tInt = callNamed("bitAnd", tByte, 3);
  if (lingoBinary("gt", tByCnt, 1)) {
  var tPowTbl = new LingoList([4, 256, 16384, 1048576, 67108864]);
  for (var i = 2; i <= tByCnt; ++i) {
  tByte = callNamed("bitAnd", callNamed("charToNum", chunkOf(tByteStr, "char", i, 0)), 63);
  tInt = callNamed("bitOr", lingoBinary("mul", tByte, tPowTbl[lingoBinary("sub", i, 1)]), tInt);
  }

  }

  if (tNeg) {
  tInt = -float(tInt);
  }

  callMethod("setaProp", meProp(_me, "pMsgStruct"), symbol("content"), tByteStr.char.range(lingoBinary("add", tByCnt, 1), callNamed("length", tByteStr)))
  m_sDebugInput = m_sDebugInput + lingoBinary("join", lingoBinary("joinPad", "INT:", tInt), "\r");
  return tInt;
}

