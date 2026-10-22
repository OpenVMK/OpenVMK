// 1a936647fad14382b01ad7810fd3d19f.cct / xml.node / getText

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getText(_me: LingoMe) {
  switch (_me._type) {
case symbol("chardata"):
  return _me.text;
case symbol("element"):
  var str = "";
  for (var node of _me.child.toArray()) {
  str = lingoBinary("join", str, callMethod("getText", node));
  }

  return str;
case symbol("procinst"):
  return _me.text;
  }

}

