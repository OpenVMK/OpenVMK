// 1a936647fad14382b01ad7810fd3d19f.cct / xml.parser / ParseText

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ParseText(_me: LingoMe, tokenStr: LingoValue) {
  var textStr = "";
  if (_me._ignoreWhiteSpace) {
  var tokens = callNamed("new", callNamed("script", "xml.tokenizer"), tokenStr, _me._whiteSpace);
  if (callMethod("hasMoreTokens", tokens)) {
  textStr = callMethod("decodeEntities", _me, callMethod("NextToken", tokens));
  }

  while (callMethod("hasMoreTokens", tokens)) {
  var textToken = callMethod("NextToken", tokens);
  textStr = lingoBinary("joinPad", textStr, callMethod("decodeEntities", _me, textToken));
  }

  } else {
  textStr = callMethod("decodeEntities", _me, tokenStr);
  }

  if (textStr.length) {
  return callNamed("new", callNamed("script", "xml.node"), undefined, symbol("chardata"), textStr);
  } else {
  return undefined;
  }

}

