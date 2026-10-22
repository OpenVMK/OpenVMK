// 2230483a2e5366aa24e52c1b02d9674c.cct /  / GetStrFrom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetStrFrom(_me: LingoMe) {
  /* global */ var pChars = globalVar("pChars");
  /* global */ var pCharsI = globalVar("pCharsI");
  /* global */ var pFirst = globalVar("pFirst");
  var tStr = callMethod("getaProp", _me.pMsgStruct, symbol("content"));
  var tArr = callNamed("offset", callNamed("numToChar", 2), tStr);
  if (lingoBinary("gt", tArr, 1)) {
  var tLen = tStr.char.range(1, lingoBinary("sub", tArr, 1));
  } else {
  tLen = "";
  }

  callMethod("setaProp", _me.pMsgStruct, symbol("content"), tStr.char.range(lingoBinary("add", tArr, 1), callNamed("length", tStr)))
  return tLen;
}

