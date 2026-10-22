// 1a936647fad14382b01ad7810fd3d19f.cct / xml.node / attrString

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function attrString(_me: LingoMe) {
  var numAttr = callNamed("count", _me.attributeValue);
  var attrStr = "";
  if (numAttr) {
  for (var i = 1; i <= numAttr; ++i) {
  var attrName = callMethod("getPropAt", meProp(_me, "attributeValue"), i);
  var attrValue = callMethod("encodeString", _me, meProp(_me, "attributeValue")[i]);
  attrStr = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", attrStr, attrName), "="), "\""), attrValue), "\"");
  }

  }

  return attrStr;
}

