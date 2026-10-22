// 1a936647fad14382b01ad7810fd3d19f.cct / xml.tokenizer / hasMoreTokens

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function hasMoreTokens(_me: LingoMe) {
  if (lingoBinary("lte", _me._currPos, _me._tokenList.count)) {
  return 1;
  } else {
  return 0;
  }

}

