// core.old.cct / String Services Class / convertSpecialChars

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function convertSpecialChars(_me: LingoMe, tString: LingoValue) {
  for (var i = callNamed("count", meProp(_me, "pConvList")); i >= 1; --i) {
  var tChunkA = callMethod("getPropAt", meProp(_me, "pConvList"), i);
  var tChunkB = meProp(_me, "pConvList")[tChunkA];
  var tTmpStr = tString;
  var tNewStr = "";
  while (lingoBinary("contains", tTmpStr, tChunkA)) {
  var tPos = lingoBinary("sub", callNamed("offset", tChunkA, tTmpStr), 1);
  if (lingoBinary("gt", tPos, 0)) {
  tNewStr = tNewStr + tTmpStr.char.range(1, tPos);
  }

  tNewStr = tNewStr + tChunkB;
  tTmpStr = deleteStringChunk(tTmpStr, "char", 1, lingoBinary("add", tPos, callNamed("length", tChunkA)));
  }

  tNewStr = tNewStr + tTmpStr;
  tString = tNewStr;
  }

  return tString;
}

