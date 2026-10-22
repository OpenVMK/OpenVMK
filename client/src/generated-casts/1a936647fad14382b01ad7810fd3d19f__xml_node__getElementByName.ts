// 1a936647fad14382b01ad7810fd3d19f.cct / xml.node / getElementByName

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getElementByName(_me: LingoMe, TagName: LingoValue, nodeList: LingoValue) {
  if (lingoBinary("eq", callNamed("ilk", nodeList), symbol("void"))) {
  nodeList = new LingoList([]);
  }

  for (var node of _me.child.toArray()) {
  if (lingoBinary("eq", node._type, symbol("element"))) {
  if (lingoBinary("eq", node.name, TagName)) {
  callMethod("add", nodeList, node)
  }

  callMethod("getElementByName", node, TagName, nodeList)
  }

  }

  if (lingoBinary("eq", nodeList.count, 1)) {
  return nodeList[1];
  } else {
  return nodeList;
  }

}

