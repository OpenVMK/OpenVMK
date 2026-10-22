// 1a936647fad14382b01ad7810fd3d19f.cct / xml.parser / makeDocument

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function makeDocument(_me: LingoMe) {
  var xmlDoc = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "<?xml version=", "\""), "1.0"), "\""), "?>"), "\r");
  for (var node of _me.child.toArray()) {
  xmlDoc = lingoBinary("join", lingoBinary("join", xmlDoc, callMethod("toString", node)), "\r");
  }

  return xmlDoc;
}

