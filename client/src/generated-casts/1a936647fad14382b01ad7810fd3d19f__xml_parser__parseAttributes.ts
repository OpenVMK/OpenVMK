// 1a936647fad14382b01ad7810fd3d19f.cct / xml.parser / parseAttributes

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parseAttributes(_me: LingoMe, attrStr: LingoValue) {
  var attrList = new LingoPropList([]);
  var attrTokens = callNamed("new", callNamed("script", "xml.tokenizer"), attrStr, lingoBinary("join", lingoBinary("join", "\"", "'="), _me._whiteSpace), 1);
  while (callMethod("hasMoreTokens", attrTokens)) {
  var token = callMethod("NextToken", attrTokens);
  while (lingoBinary("contains", _me._whiteSpace, token)) {
  token = callMethod("NextToken", attrTokens);
  }

  var attrName = token;
  while (lingoBinary("neq", token, "=")) {
  token = callMethod("NextToken", attrTokens);
  }

  var quoteType = callMethod("NextToken", attrTokens);
  while (lingoBinary("and", lingoBinary("neq", quoteType, "'"), lingoBinary("neq", quoteType, "\""))) {
  quoteType = callMethod("NextToken", attrTokens);
  }

  token = callMethod("NextToken", attrTokens);
  var attrValue = "";
  while (lingoBinary("neq", token, quoteType)) {
  attrValue = lingoBinary("join", attrValue, token);
  token = callMethod("NextToken", attrTokens);
  }

  attrValue = callMethod("decodeEntities", _me, attrValue);
  callMethod("addProp", attrList, attrName, attrValue)
  }

  return attrList;
}

