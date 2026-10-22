// 1a936647fad14382b01ad7810fd3d19f.cct / xml.parser / makeList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function makeList(_me: LingoMe) {
  var docList = new LingoPropList([]);
  var childList = new LingoPropList(["!ATTRIBUTES", new LingoPropList([])]);
  for (var node of _me.child.toArray()) {
  switch (node._type) {
case symbol("element"):
  callMethod("addProp", childList, node.name, callMethod("toList", node))
  break;
case symbol("procinst"):
  callMethod("addProp", childList, "!PROCINST", callMethod("toList", node))
  break;
case symbol("chardata"):
  callMethod("addProp", childList, "!CHARDATA", callMethod("toList", node))
  break;
  }

  }

  if (callNamed("count", _me.child)) {
  callMethod("addProp", docList, "ROOT OF XML DOCUMENT", childList)
  }

  return docList;
}

