// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpMenuItemTopic / addPages

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function addPages(_me: LingoMe, parentNode: LingoValue) {
  for (var node of parentNode.child.toArray()) {
  if (lingoBinary("eq", node._type, "PAGE")) {
  callMethod("append", meProp(_me, "pages"), node.value)
  }

  }

}

