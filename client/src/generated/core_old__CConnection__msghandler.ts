// core.old.cct / CConnection / msghandler

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function msghandler(_me: LingoMe, tContent: LingoValue) {
  if (lingoBinary("neq", callNamed("ilk", tContent), symbol("string"))) {
  return 0;
  }

  if (lingoBinary("gt", meProp(_me, "pLastContent").length, 0)) {
  tContent = lingoBinary("join", meProp(_me, "pLastContent"), tContent);
  setMeProp(_me, "pLastContent", "");
  }

  if (lingoBinary("lt", tContent.length, 3)) {
  setMeProp(_me, "pLastContent", lingoBinary("join", meProp(_me, "pLastContent"), tContent));
  return;
  }

  var tByte1 = callNamed("bitAnd", callNamed("charToNum", chunkOf(tContent, "char", 2, 0)), 63);
  var tByte2 = callNamed("bitAnd", callNamed("charToNum", chunkOf(tContent, "char", 1, 0)), 63);
  var tMsgType = callNamed("bitOr", lingoBinary("mul", tByte2, 64), tByte1);
  var tLength = callNamed("offset", callNamed("numToChar", 1), tContent);
  if (lingoBinary("eq", tLength, 0)) {
  setMeProp(_me, "pLastContent", tContent);
  return;
  }

  var tParams = chunkOf(tContent, "char", 3, lingoBinary("sub", tLength, 1));
  tContent = chunkOf(tContent, "char", lingoBinary("add", tLength, 1), tContent.length);
  callMethod("forwardMsg", _me, tMsgType, tParams)
  if (lingoBinary("gt", tContent.length, 0)) {
  callMethod("msghandler", _me, tContent)
  }

}

