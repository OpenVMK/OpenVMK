// 1a936647fad14382b01ad7810fd3d19f.cct / xml.tokenizer / new

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _new(_me: LingoMe, str: LingoValue, delims: LingoValue, returnTokens: LingoValue) {
  switch (theProperty("paramCount")) {
case 2:
  delims = lingoBinary("join", lingoBinary("join", " ", "\t"), "\r");
  returnTokens = 0;
case 3:
  returnTokens = 0;
  }

  setThePropOf(_me, "_tokenList", new LingoList([]));
  var numDelims = delims.length;
  var delimList = new LingoList([]);
  for (var i = 1; i <= numDelims; ++i) {
  var delimChar = delims.char[i];
  if (callNamed("offset", delimChar, str)) {
  callMethod("add", delimList, delimChar)
  }

  }

  while (str.length) {
  var offsetList = new LingoList([]);
  for (var j of delimList.toArray()) {
  var charOffset = callNamed("offset", j, str);
  if (charOffset) {
  callMethod("add", offsetList, charOffset)
  }

  }

  if (offsetList.count) {
  var tokenOffset = callNamed("min", offsetList);
  if (lingoBinary("gt", tokenOffset, 1)) {
  callMethod("add", _me._tokenList, str.char.range(1, lingoBinary("sub", tokenOffset, 1)))
  }

  if (returnTokens) {
  callMethod("add", _me._tokenList, str.char[tokenOffset])
  }

  str = deleteStringChunk(str, "char", 1, tokenOffset);
  continue;
  }

  callMethod("add", _me._tokenList, str)
  str = "";
  }

  setThePropOf(_me, "_currPos", 1);
  return _me;
}

