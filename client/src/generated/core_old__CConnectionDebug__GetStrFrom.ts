// core.old.cct / CConnectionDebug / GetStrFrom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetStrFrom(_me: LingoMe) {
  var tArr = callMethod("getaProp", meProp(_me, "pMsgStruct"), symbol("content"));
  var tLen = callNamed("offset", callNamed("numToChar", 2), tArr);
  if (lingoBinary("gt", tLen, 1)) {
  var tStr = chunkOf(tArr, "char", 1, lingoBinary("sub", tLen, 1));
  } else {
  tStr = "";
  }

  callMethod("setaProp", meProp(_me, "pMsgStruct"), symbol("content"), chunkOf(tArr, "char", lingoBinary("add", tLen, 1), callNamed("length", tArr)))
  m_sDebugInput = m_sDebugInput + lingoBinary("join", lingoBinary("joinPad", "STR:", tStr), "\r");
  return tStr;
}

