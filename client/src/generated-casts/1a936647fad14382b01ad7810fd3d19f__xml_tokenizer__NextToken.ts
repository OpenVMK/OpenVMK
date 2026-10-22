// 1a936647fad14382b01ad7810fd3d19f.cct / xml.tokenizer / NextToken

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function NextToken(_me: LingoMe) {
  if (lingoBinary("lte", _me._currPos, _me._tokenList.count)) {
  var token = _me._tokenList[_me._currPos];
  setThePropOf(_me, "_currPos", lingoBinary("add", _me._currPos, 1));
  return token;
  } else {
  return undefined;
  }

}

