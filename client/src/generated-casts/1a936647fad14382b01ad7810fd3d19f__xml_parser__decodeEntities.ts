// 1a936647fad14382b01ad7810fd3d19f.cct / xml.parser / decodeEntities

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function decodeEntities(_me: LingoMe, str: LingoValue) {
  if (lingoBinary("and", callNamed("offset", "&", str), callNamed("offset", ";", str))) {
  var tokens = callNamed("new", callNamed("script", "xml.tokenizer"), str, "&;", 1);
  var decodedStr = "";
  while (callMethod("hasMoreTokens", tokens)) {
  var token = callMethod("NextToken", tokens);
  if (lingoBinary("eq", token, "&")) {
  var entityName = callMethod("NextToken", tokens);
  if (lingoBinary("eq", entityName.char[1], "#")) {
  if (lingoBinary("eq", entityName.char[2], "x")) {
  var entityValue = callNamed("numToChar", callNamed("rgb", lingoBinary("join", entityName.char.range(3, 4), "FFFF")).red);
  } else {
  entityValue = callNamed("numToChar", entityName.value);
  }

  } else {
  entityValue = callMethod("getaProp", _me._entityList, entityName);
  }

  decodedStr = lingoBinary("join", decodedStr, entityValue);
  callMethod("NextToken", tokens)
  continue;
  }

  decodedStr = lingoBinary("join", decodedStr, token);
  }

  return decodedStr;
  } else {
  return str;
  }

}

