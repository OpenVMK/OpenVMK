// 2230483a2e5366aa24e52c1b02d9674c.cct /  / msghandler

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function msghandler(_me: LingoMe, tContent: LingoValue) {
  /* global */ var pChars = globalVar("pChars");
  /* global */ var pCharsI = globalVar("pCharsI");
  /* global */ var pFirst = globalVar("pFirst");
  if (lingoBinary("neq", callNamed("ilk", tContent), symbol("string"))) {
  return 0;
  }

  if (lingoBinary("gt", _me.pLastContent.length, 0)) {
  tContent = lingoBinary("join", _me.pLastContent, tContent);
  setThePropOf(_me, "pLastContent", "");
  }

  if (lingoBinary("lt", tContent.length, 3)) {
  setThePropOf(_me, "pLastContent", lingoBinary("join", _me.pLastContent, tContent));
  return;
  }

  var tByte1 = callNamed("bitAnd", callNamed("charToNum", tContent.char[1]), 63);
  var tByte2 = callNamed("bitAnd", callNamed("charToNum", tContent.char[2]), 63);
  var tMsgType = callNamed("bitOr", lingoBinary("mul", tByte1, 64), tByte2);
  var tLength = callNamed("offset", callNamed("numToChar", 1), tContent);
  if (lingoBinary("eq", tLength, 0)) {
  setThePropOf(_me, "pLastContent", tContent);
  return;
  }

  var tParams = tContent.char.range(3, lingoBinary("sub", tLength, 1));
  tContent = tContent.char.range(lingoBinary("add", tLength, 1), tContent.length);
  callNamed("forwardMsg", _me, tMsgType, tParams)
  if (lingoBinary("gt", tContent.length, 0)) {
  callNamed("msghandler", _me, tContent)
  }

}

