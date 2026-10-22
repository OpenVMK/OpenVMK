// 1a936647fad14382b01ad7810fd3d19f.cct / xml.node / getAt

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getAt(_me: LingoMe, index: LingoValue) {
  if (lingoBinary("eq", callNamed("ilk", index), symbol("integer"))) {
  return _me.child[index];
  } else {
  index = callNamed("string", index);
  for (var node of _me.child.toArray()) {
  if (lingoBinary("eq", node.name, index)) {
  return node;
  }

  }

  }

}

