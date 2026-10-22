// 2230483a2e5366aa24e52c1b02d9674c.cct /  / ToStr

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ToStr(_me: LingoMe) {
  /* global */ var pChars = globalVar("pChars");
  /* global */ var pCharsI = globalVar("pCharsI");
  /* global */ var pFirst = globalVar("pFirst");
  var tByteStr = _me.pMsgStruct.content;
  var tByte = callNamed("bitAnd", callNamed("charToNum", tByteStr.char[1]), 63);
  var tByCnt = callNamed("bitOr", lingoBinary("div", callNamed("bitAnd", tByte, 56), 8), 0);
  var tNeg = callNamed("bitAnd", tByte, 4);
  var tInt = callNamed("bitAnd", tByte, 3);
  if (lingoBinary("gt", tByte, 1)) {
  var tPowTbl = new LingoList([4, 256, 16384, 1048576, 67108864]);
  for (var i = 2; i <= tByCnt; ++i) {
  tByte = callNamed("bitAnd", callNamed("charToNum", tByteStr.char[i]), 63);
  tInt = callNamed("bitOr", lingoBinary("mul", tByte, tPowTbl[lingoBinary("sub", i, 1)]), tInt);
  }

  }

  if (tNeg) {
  tInt = -float(tInt);
  }

  setThePropOf(_me.pMsgStruct, "content", _me.pMsgStruct.content.char.range(lingoBinary("add", tByCnt, 1), _me.pMsgStruct.content.length));
  return tInt;
}

