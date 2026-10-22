// core.old.cct / CConnection / send

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function send(_me: LingoMe, tCmd: LingoValue, tParmArr: LingoValue) {
  if (lingoBinary("neq", _player, undefined)) {
  if (_player.traceScript) {
  return 0;
  }

  }

  if (!lingoTruthy(lingoBinary("and", meProp(_me, "pConnectionOk"), callNamed("objectp", meProp(_me, "pXtra"))))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Connection not ready:", callMethod("getID", _me)), symbol("send"));
  }

  var tMsg = "";
  var tLength = 2;
  if (callNamed("listp", tParmArr)) {
  for (var i = 1; i <= tParmArr.count; ++i) {
  var t_kType = callMethod("getPropAt", tParmArr, i);
  var t_vParm = tParmArr[i];
  switch (t_kType) {
case symbol("string"):
case symbol("str"):
  var t_iLen = 0;
  for (var t_iChr = 1; t_iChr <= callNamed("length", t_vParm); ++t_iChr) {
  var t_iNum = callNamed("charToNum", chunkOf(t_vParm, "char", t_iChr, 0));
  t_iLen = lingoBinary("add", lingoBinary("add", t_iLen, 1), lingoBinary("gt", t_iNum, 255));
  }

  var t_sLen = callMethod("ToInt", _me, t_iLen);
  tMsg = tMsg + lingoBinary("join", t_sLen, t_vParm);
  tLength = lingoBinary("add", lingoBinary("add", tLength, t_iLen), callNamed("length", t_sLen));
  break;
case symbol("short"):
case symbol("Byte"):
  var tByte = callNamed("numToChar", callNamed("bitOr", 64, callNamed("bitAnd", 63, t_vParm)));
  tMsg = tMsg + tByte;
  tLength = lingoBinary("add", tLength, 1);
  break;
case symbol("integer"):
case symbol("int"):
  var t_sInt = callMethod("ToInt", _me, t_vParm);
  tMsg = tMsg + t_sInt;
  tLength = lingoBinary("add", tLength, callNamed("length", t_sInt));
  break;
case symbol("boolean"):
case symbol("bool"):
  t_vParm = lingoBinary("neq", t_vParm, 0);
  tByte = callNamed("numToChar", callNamed("bitOr", 64, callNamed("bitAnd", 63, t_vParm)));
  tMsg = tMsg + tByte;
  tLength = lingoBinary("add", tLength, 1);
  break;
  default:
  callNamed("error", _me, lingoBinary("joinPad", "Unsupported param type:", t_kType), symbol("send"))
  break;
  break;
  break;
  break;
  }

  }

  }

  if (lingoBinary("gt", meProp(_me, "pLogMode"), 0)) {
  callMethod("log", _me, lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "<--", "("), tCmd), ")"), tMsg))
  }

  callMethod("set", callNamed("getObject", symbol("session")), "con_lastsend", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", theProperty("long time"), tCmd), "-"), tMsg))
  if (lingoBinary("eq", callNamed("ilk", tCmd), symbol("integer"))) {
  var tBy1 = callNamed("numToChar", callNamed("bitOr", 64, lingoBinary("div", tCmd, 64)));
  var tBy2 = callNamed("numToChar", callNamed("bitOr", 64, callNamed("bitAnd", 63, tCmd)));
  tCmd = lingoBinary("join", tBy1, tBy2);
  } else {
  tCmd = callMethod("getaProp", callMethod("getaProp", meProp(_me, "pCommandsPntr"), symbol("value")), tCmd);
  }

  if (lingoBinary("eq", callNamed("ilk", tCmd), symbol("void"))) {
  return callNamed("error", _me, "Unrecognized command!", symbol("send"));
  }

  tMsg = lingoBinary("join", tCmd, tMsg);
  var tL1 = callNamed("numToChar", callNamed("bitOr", callNamed("bitAnd", tLength, 63), 64));
  var tL2 = callNamed("numToChar", callNamed("bitOr", callNamed("bitAnd", lingoBinary("div", tLength, 64), 63), 64));
  var tL3 = callNamed("numToChar", callNamed("bitOr", callNamed("bitAnd", lingoBinary("div", tLength, 4096), 63), 64));
  tMsg = lingoBinary("join", lingoBinary("join", lingoBinary("join", tL3, tL2), tL1), tMsg);
  if (lingoBinary("and", meProp(_me, "pEncryptionOn"), callNamed("objectp", meProp(_me, "pDecoder")))) {
  tMsg = callMethod("Encipher", meProp(_me, "pDecoder"), tMsg);
  }

  callMethod("sendNetMessage", meProp(_me, "pXtra"), 0, 0, tMsg)
  return 1;
}

