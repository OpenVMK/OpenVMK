// 2230483a2e5366aa24e52c1b02d9674c.cct /  / send

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function send(_me: LingoMe, tCmd: LingoValue, tParmArr: LingoValue) {
  /* global */ var pChars = globalVar("pChars");
  /* global */ var pCharsI = globalVar("pCharsI");
  /* global */ var pFirst = globalVar("pFirst");
  if (callNamed("voidp", tCmd)) {
  return 0;
  }

  if (lingoBinary("and", (lingoTruthy(callNamed("objectp", _me.pXtra)) ? 0 : 1), _me.pConnectionOk)) {
  return callNamed("error", _me, lingoBinary("joinPad", "Connection not ready:", callNamed("getID", _me)), symbol("send"));
  }

  var tMsg = "";
  var tLength = 2;
  if (callNamed("listp", tParmArr)) {
  var i = 1;
  while (lingoBinary("lte", i, tParmArr.count)) {
  var t_kType = callNamed("getPropAt", tParmArr, i);
  var t_vParm = tParmArr[i];
  if (lingoBinary("or", lingoBinary("eq", t_kType, symbol("str")), lingoBinary("eq", t_kType, symbol("string")))) {
  var t_sLen = callMethod("ToInt", _me, t_vParm.length);
  tLength = lingoBinary("add", lingoBinary("add", tLength, t_vParm.length), callNamed("length", t_sLen));
  tMsg = lingoBinary("join", lingoBinary("join", tMsg, t_sLen), t_vParm);
  } else {
  if (lingoBinary("eq", t_kType, symbol("Byte"))) {
  var t_sInt = callNamed("ToInt", _me, t_vParm);
  tLength = lingoBinary("add", tLength, callNamed("length", t_sInt));
  tMsg = lingoBinary("join", tMsg, t_sInt);
  } else {
  if (lingoBinary("or", lingoBinary("eq", t_kType, symbol("int")), lingoBinary("eq", t_kType, symbol("integer")))) {
  t_sInt = callNamed("ToInt", _me, t_vParm);
  tLength = lingoBinary("add", tLength, callNamed("length", t_sInt));
  tMsg = lingoBinary("join", tMsg, t_sInt);
  } else {
  if (lingoBinary("eq", tMsg, symbol("bool"))) {
  t_sInt = callNamed("ToInt", _me, t_vParm);
  tLength = lingoBinary("add", tLength, callNamed("length", t_sInt));
  tMsg = lingoBinary("join", tMsg, t_sInt);
  } else {
  callNamed("error", _me, lingoBinary("joinPad", "Unsupported param type:", t_kType), symbol("send"))
  }

  }

  }

  }

  if (lingoBinary("gt", _me.pLogMode, 0)) {
  callNamed("log", _me, lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "<--", "("), tCmd), ")"), tMsg))
  }

  i = lingoBinary("add", i, 1);
  }

  }

  callMethod("set", callNamed("getObject", symbol("session")), "con_lastsend", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", 8, tCmd), "-"), tMsg))
  if (lingoBinary("eq", callNamed("ilk", tCmd), symbol("integer"))) {
  var tBy1 = callNamed("numToChar", callNamed("bitOr", 64, lingoBinary("div", tCmd, 64)));
  var tBy2 = callNamed("numToChar", callNamed("bitOr", 64, callNamed("bitAnd", 63, tCmd)));
  tCmd = lingoBinary("join", tBy1, tBy2);
  } else {
  tCmd = callMethod("getaProp", callMethod("getaProp", _me.pCommandsPntr, symbol("value")), tCmd);
  }

  if (lingoBinary("eq", callNamed("ilk", tCmd), symbol("void"))) {
  return callNamed("error", _me, "Unrecognized command!", symbol("send"));
  }

  tMsg = lingoBinary("join", tCmd, tMsg);
  var tL1 = callNamed("numToChar", callNamed("bitOr", callNamed("bitAnd", tLength, 63), 64));
  var tL2 = callNamed("numToChar", callNamed("bitOr", callNamed("bitAnd", lingoBinary("div", tLength, 64), 63), 64));
  var tL3 = callNamed("numToChar", callNamed("bitOr", callNamed("bitAnd", lingoBinary("div", tLength, 4096), 63), 64));
  tMsg = lingoBinary("join", lingoBinary("join", lingoBinary("join", tL3, tL2), tL1), tMsg);
  tMsg = callMethod("Encipher", callNamed("script", "CInit").m_CastLoader[2], tMsg);
  callNamed("sendNetMessage", _me.pXtra, 0, 0, tMsg)
  return 1;
}

