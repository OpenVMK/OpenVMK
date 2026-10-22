// core.old.cct / String Services Class / replaceChunks

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function replaceChunks(_me: LingoMe, tString: LingoValue, tChunkA: LingoValue, tChunkB: LingoValue) {
  var tStr = "";
  while (lingoBinary("contains", tString, tChunkA)) {
  var tPos = lingoBinary("sub", callNamed("offset", tChunkA, tString), 1);
  if (lingoBinary("gt", tPos, 0)) {
  tStr = tStr + tString.char.range(1, tPos);
  }

  tStr = tStr + tChunkB;
  tString = deleteStringChunk(tString, "char", 1, lingoBinary("add", tPos, callNamed("length", tChunkA)));
  }

  tStr = tStr + tString;
  return tStr;
}

