// 1a936647fad14382b01ad7810fd3d19f.cct / xml.parser / parseProcInst

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parseProcInst(_me: LingoMe, tokenStr: LingoValue) {
  tokenStr = deleteStringChunk(tokenStr, "char", tokenStr.length, tokenStr.length);
  tokenStr = deleteStringChunk(tokenStr, "char", 1, 1);
  var piName = tokenStr.word[1];
  var piData = tokenStr.word.range(2, tokenStr.word.count);
  var piNode = callNamed("new", callNamed("script", "xml.node"), piName, symbol("procinst"), piData);
  return piNode;
}

