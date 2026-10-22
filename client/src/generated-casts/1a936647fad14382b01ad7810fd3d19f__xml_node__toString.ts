// 1a936647fad14382b01ad7810fd3d19f.cct / xml.node / toString

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function toString(_me: LingoMe) {
  switch (_me._type) {
case symbol("element"):
  if (_me.isEmpty) {
  var tag = lingoBinary("join", lingoBinary("join", lingoBinary("join", "<", _me.name), callMethod("attrString", _me)), "/>");
  } else {
  tag = lingoBinary("join", lingoBinary("join", lingoBinary("join", "<", _me.name), callMethod("attrString", _me)), ">");
  for (var node of _me.child.toArray()) {
  tag = lingoBinary("join", tag, callMethod("toString", node));
  }

  tag = lingoBinary("join", lingoBinary("join", lingoBinary("join", tag, "</"), _me.name), ">");
  }

  return tag;
case symbol("chardata"):
  return callMethod("encodeString", _me, _me.text);
case symbol("procinst"):
  return lingoBinary("join", lingoBinary("joinPad", lingoBinary("join", "<?", _me.name), _me.text), "?>");
  }

}

