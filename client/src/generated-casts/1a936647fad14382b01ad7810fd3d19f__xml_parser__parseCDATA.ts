// 1a936647fad14382b01ad7810fd3d19f.cct / xml.parser / parseCDATA

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parseCDATA(_me: LingoMe, tokenStr: LingoValue) {
  tokenStr = deleteStringChunk(tokenStr, "char", lingoBinary("sub", tokenStr.length, 1), tokenStr.length);
  tokenStr = deleteStringChunk(tokenStr, "char", 1, 8);
  if (tokenStr.length) {
  return callNamed("new", callNamed("script", "xml.node"), undefined, symbol("chardata"), tokenStr);
  } else {
  return undefined;
  }

}

