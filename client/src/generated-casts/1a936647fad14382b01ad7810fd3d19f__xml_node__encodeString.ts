// 1a936647fad14382b01ad7810fd3d19f.cct / xml.node / encodeString

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function encodeString(_me: LingoMe, str: LingoValue) {
  var encodedStr = "";
  var numChars = str.length;
  for (var i = 1; i <= numChars; ++i) {
  var currChar = str.char[i];
  switch (currChar) {
case "<":
  encodedStr = lingoBinary("join", encodedStr, "&lt;");
  break;
case ">":
  encodedStr = lingoBinary("join", encodedStr, "&gt;");
  break;
case "'":
  encodedStr = lingoBinary("join", encodedStr, "&apos;");
  break;
case "\"":
  encodedStr = lingoBinary("join", encodedStr, "&quot;");
  break;
case "&":
  encodedStr = lingoBinary("join", encodedStr, "&amp;");
  break;
  default:
  var charNum = callNamed("charToNum", currChar);
  if (lingoBinary("gt", charNum, 127)) {
  encodedStr = lingoBinary("join", lingoBinary("join", lingoBinary("join", encodedStr, "&#"), charNum), ";");
  } else {
  encodedStr = lingoBinary("join", encodedStr, currChar);
  }

  }

  }

  return encodedStr;
}

